import { createEstateDTO } from "../DTOs/EstateDTO.js";

export class EstateMapper {
    static toCreateEstateDTO(body) {
        //valutare se inserire validazioni qui per prezzo e dimensioni
        return new createEstateDTO({
            description: body.description,
            photo: body.photo,
            price: body.price,
            size: body.size,
            //idAgency: body.idAgency
        });
    }

    static estateToDTO(estate) {
        return new createEstateDTO({
            idRealEstate: estate.idRealEstate,
            description: estate.description,
            photo: estate.photo,
            price: estate.price,
            size: estate.size,
            idAgency: estate.idAgency,
            createdBy: estate.createdBy,
            creatorId: estate.createdBy === "agent" ? estate.idAgent : estate.idManager
        })
    }

    // Optional: If you want to format delete responses consistently
    static toDeleteResponse(message, estateId) {
        return {
            message: message,
            deletedEstateId: estateId
        };
    }
}