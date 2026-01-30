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
    const response = {};

    if (dto.minPrice !== null) response.minPrice = dto.minPrice;
    if (dto.maxPrice !== null) response.maxPrice = dto.maxPrice;
    if (dto.nRooms !== null) response.nRooms = dto.nRooms;
    if (dto.nBathrooms !== null) response.nBathrooms = dto.nBathrooms;
    if (dto.minSize !== null) response.minSize = dto.minSize;
    if (dto.maxSize !== null) response.maxSize = dto.maxSize;
    if (dto.energyClass !== null) response.energyClass = dto.energyClass;
    if (dto.floor !== null) response.floor = dto.floor;
    if (dto.type !== null) response.type = dto.type;
    if (dto.idAgency !== null) response.idAgency = dto.idAgency;
    if (dto.lat !== null && dto.lat !== undefined) response.lat = dto.lat;
    if (dto.lon !== null && dto.lon !== undefined) response.lon = dto.lon;
    if (dto.radius !== null && dto.radius !== undefined)
      response.radius = dto.radius;
    return response;
  }
}
