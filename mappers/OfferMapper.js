import { CreateOfferDTO } from "../DTOs/OfferDTO.js";

export class OfferMapper {
    static toCreateOfferDTO(body) {
        return new CreateOfferDTO({
            idRealEstate: body.idRealEstate,
            amount: body.amount,
            inSistem: body.inSistem ?? false
        });
    }
}