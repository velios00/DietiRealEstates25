import { SearchFiltersDTO } from "../DTOs/SearchFiltersDTO.js";

export class SearchFiltersMapper {
  static fromQuery(query) {
    return new SearchFiltersDTO({
      city: query.city,
      minPrice: query.minPrice ? parseFloat(query.minPrice) : undefined,
      maxPrice: query.maxPrice ? parseFloat(query.maxPrice) : undefined,
      nRooms: query.nRooms ? parseInt(query.nRooms, 10) : undefined,
      nBathrooms: query.nBathrooms ? parseInt(query.nBathrooms, 10) : undefined,
      minSize: query.minSize ? parseFloat(query.minSize) : undefined,
      maxSize: query.maxSize ? parseFloat(query.maxSize) : undefined,
      energyClass: query.energyClass,
      floor: query.floor ? parseInt(query.floor, 10) : undefined,
      type: query.type,
      idAgency: query.idAgency ? parseInt(query.idAgency, 10) : undefined,
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
      if (dto[key] !== null && dto[key] !== undefined) {
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
