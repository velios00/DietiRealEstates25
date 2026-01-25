export class createEstateDTO {
  constructor({
    title,
    /*idRealEstate,*/ description,
    photos,
    price,
    size,
    address,
    /*idAgency,*/ nRooms,
    nBathrooms,
    energyClass,
    floor,
    createdBy,
    creatorId,
  }) {
    this.title = title;
    //this.idRealEstate = idRealEstate;
    this.description = description;
    this.photos = photos;
    this.price = price;
    this.size = size;
    //this.idAgency = idAgency;
    this.address = address;
    this.nRooms = nRooms;
    this.nBathrooms = nBathrooms;
    this.energyClass = energyClass;
    this.floor = floor;
    this.createdBy = createdBy;
    this.creatorId = creatorId;
  }
}
