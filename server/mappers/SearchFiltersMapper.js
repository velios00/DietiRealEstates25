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

    return response;
  }
}
