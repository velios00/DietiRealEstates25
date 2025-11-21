import { createEstateDTO } from "../DTOs/EstateDTO.js";

export class EstateMapper {
    static toCreateEstateDTO(body) {
        return new createEstateDTO(
            body.description,
            body.photo,
            body.price,
            body.size,
            //body.idAgency
        );
    }

    static estateToDTO(estate) {
        return {
            idEstate: estate.idEstate,
            description: estate.description,
            photo: estate.photo,
            price: estate.price,
            size: estate.size,
            idAgency: estate.idAgency 
        }
    }
}