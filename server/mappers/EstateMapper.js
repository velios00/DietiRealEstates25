import { createEstateDTO } from "../DTOs/EstateDTO.js";

export class EstateMapper {
  static toCreateEstateDTO(body) {
    return new createEstateDTO({
      title: body.title,
      description: body.description,
      photos: body.photos,
      price: body.price,
      size: body.size,
      address: body.address,
      type: body.type,
      nRooms: body.nRooms,
      nBathrooms: body.nBathrooms,
      energyClass: body.energyClass,
      floor: body.floor,
      //idAgency: body.idAgency
    });
  }

  static estateToDTO(estate) {
    return {
      idRealEstate: estate.idRealEstate,
      title:
        estate.title ||
        estate.description?.substring(0, 50) ||
        "Estate senza titolo",
      description: estate.description,
      photos: estate.photos,
      price: estate.price,
      size: estate.size,
      nRooms: estate.nRooms,
      nBathrooms: estate.nBathrooms,
      energyClass: estate.energyClass,
      floor: estate.floor,
      type: estate.type,
      idPlace: estate.idPlace,
      place: estate.Place
        ? {
            ...estate.Place.toJSON(),
            pois: estate.Place.pois ? JSON.parse(estate.Place.pois) : [],
          }
        : null,
      creationDate: estate.createdAt,
      //idAgency: estate.idAgency
    };
  }
}
