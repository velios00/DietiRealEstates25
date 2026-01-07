export class SearchFiltersDTO {
  constructor({
    city,
    minPrice,
    maxPrice,
    nRooms,
    nBathrooms,
    minSize,
    maxSize,
    energyClass,
    floor,
  }) {
    this.city = city;
    this.minPrice = minPrice ? parseFloat(minPrice) : null;
    this.maxPrice = maxPrice ? parseFloat(maxPrice) : null;
    this.nRooms = nRooms ? parseInt(nRooms) : null;
    this.nBathrooms = nBathrooms ? parseInt(nBathrooms) : null;
    this.minSize = minSize ? parseInt(minSize) : null;
    this.maxSize = maxSize ? parseInt(maxSize) : null;
    this.energyClass = energyClass || null;
    this.floor = floor ? parseInt(floor) : null;
  }
}
