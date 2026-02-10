import { SearchFiltersDTO } from "../DTOs/SearchFiltersDTO.js";

export class SearchFiltersMapper {
  static fromQuery(query) {
    return new SearchFiltersDTO({
      city: query.city,
      minPrice: query.minPrice,
      maxPrice: query.maxPrice,
      nRooms: query.nRooms,
      nBathrooms: query.nBathrooms,
      minSize: query.minSize,
      maxSize: query.maxSize,
      energyClass: query.energyClass,
      floor: query.floor,
      type: query.type,
      idAgency: query.idAgency,
      lat: query.lat ? parseFloat(query.lat) : undefined,
      lon: query.lon ? parseFloat(query.lon) : undefined,
      radius: query.radius ? parseFloat(query.radius) : undefined,
    });
  }

  static toResponse(dto) {
    const keys = [
      "minPrice",
      "maxPrice",
      "nRooms",
      "nBathrooms",
      "minSize",
      "maxSize",
      "energyClass",
      "floor",
      "type",
      "idAgency",
    ];

    const response = keys.reduce((acc, key) => {
      if (dto[key] !== null) {
        acc[key] = dto[key];
      }
      return acc;
    }, {});

    // Gestisci casi speciali per lat, lon e radius
    ["lat", "lon", "radius"].forEach((key) => {
      if (dto[key] !== null && dto[key] !== undefined) {
        response[key] = dto[key];
      }
    });

    return response;
  }
}
