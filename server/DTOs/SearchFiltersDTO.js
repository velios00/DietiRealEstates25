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
    type,
    idAgency,
    lat,
    lon,
    radius,
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
    this.type = type || null;
    this.idAgency = idAgency ? parseInt(idAgency) : null;
    this.lat = lat ? parseFloat(lat) : undefined;
    this.lon = lon ? parseFloat(lon) : undefined;
    this.radius = radius ? parseFloat(radius) : undefined;
  }
}
