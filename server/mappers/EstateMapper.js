import { createEstateDTO } from "../DTOs/EstateDTO.js";

export class EstateMapper {
  static toCreateEstateDTO(body) {
    return new createEstateDTO({
      description: body.description,
      photos: body.photos,
      price: body.price,
      size: body.size,
      address: body.address,
      nRooms: body.nRooms,
      nBathrooms: body.nBathrooms,
      energyClass: body.energyClass,
      floor: body.floor,
      //idAgency: body.idAgency
    });
  }

  static estateToDTO(estate) {
    return {
      idEstate: estate.idEstate,
      description: estate.description,
      photos: estate.photos,
      price: estate.price,
      size: estate.size,
      nRooms: estate.nRooms,
      nBathrooms: estate.nBathrooms,
      energyClass: estate.energyClass,
      floor: estate.floor,
      idPlace: estate.idPlace,
      place: estate.Place
        ? {
            ...estate.Place.toJSON(),
            pois: estate.Place.pois ? JSON.parse(estate.Place.pois) : [],
          }
        : null,
      //idAgency: estate.idAgency
    };
  }
}
