import { CreateOfferDTO, OfferDTO } from "../DTOs/OfferDTO.js";

export class OfferMapper {
  static toCreateOfferDTO(body, idRealEstate) {
    return new CreateOfferDTO({
      idRealEstate: idRealEstate,
      amount: body.amount,
      inSistem: true,
    });
  }

  static toCreateExternalOfferDTO(body) {
    return new CreateOfferDTO({
      idRealEstate: body.idRealEstate,
      amount: body.amount,
      inSistem: false,
    });
  }

  static toOfferDTO(offer) {
    return new OfferDTO({
      idOffer: offer.idOffer,
      idUser: offer.idUser,
      idRealEstate: offer.idRealEstate,
      amount: offer.amount,
      userName: offer.User?.name || "Esterno",
      userSurname: offer.User?.surname || "",
      status: offer.status,
      dateOffer: offer.dateOffer,
      inSistem: offer.inSistem,
      counterOfferAmount: offer.counterOfferAmount,
    });
  }

  static toOfferDTOList(offers) {
    return offers.map((o) => this.toOfferDTO(o));
  }
}
