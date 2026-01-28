import { CreateOfferDTO } from "../DTOs/OfferDTO.js";

export class OfferMapper {
  static toCreateOfferDTO(body) {
    return new CreateOfferDTO({
      idRealEstate: body.idRealEstate,
      amount: body.amount,
      inSistem: body.inSistem ?? false,
    });
  }

  static toOfferDTO(offer) {
    return new OfferDTO({
      id: offer.id,
      amount: offer.amount,
      userName: offer.user?.name,
      userSurname: offer.user?.surname,
    });
  }

  static toOfferDTOList(offers) {
    return offers.map((o) => this.toOfferDTO(o));
  }
}
