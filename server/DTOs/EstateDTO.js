export class CreateEstateDTO {
  constructor({
    title,
    description,
    photos,
    price,
    size,
    address,
    city,
    type,
    nRooms,
    nBathrooms,
    energyClass,
    floor,
    createdBy,
    creatorId,
  }) {
    this.title = title;
    this.description = description;
    this.photos = photos;
    this.price = price;
    this.size = size;
    this.address = address;
    this.city = city;
    this.type = type;
    this.nRooms = nRooms;
    this.nBathrooms = nBathrooms;
    this.energyClass = energyClass;
    this.floor = floor;
    this.createdBy = createdBy;
    this.creatorId = creatorId;
  }
}
