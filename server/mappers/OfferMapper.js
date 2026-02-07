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

  static toOfferDTOWithEstate(offer) {
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
      realEstate: offer.RealEstate
        ? {
            idRealEstate: offer.RealEstate.idRealEstate,
            title: offer.RealEstate.title,
            description: offer.RealEstate.description,
            photos: offer.RealEstate.photos,
            type: offer.RealEstate.type,
            price: offer.RealEstate.price,
            size: offer.RealEstate.size,
            nRooms: offer.RealEstate.nRooms,
            nBathrooms: offer.RealEstate.nBathrooms,
            energyClass: offer.RealEstate.energyClass,
            floor: offer.RealEstate.floor,
            creationDate: offer.RealEstate.creationDate,
            place: offer.RealEstate.Place
              ? {
                  idPlace: offer.RealEstate.Place.idPlace,
                  city: offer.RealEstate.Place.city,
                  address: offer.RealEstate.Place.address,
                }
              : null,
          }
        : null,
    });
  }

  static toOfferDTOList(offers) {
    return offers.map((o) => this.toOfferDTO(o));
  }
}
