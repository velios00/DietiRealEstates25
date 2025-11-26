export class createEstateDTO {
    constructor({ idRealEstate, description, photo, price, size, idAgency, createdBy, creatorId }){
        this.idRealEstate = idRealEstate;
        this.description = description;
        this.photo = photo;
        this.price = price;
        this.size = size;
        this.idAgency = idAgency;
        this.createdBy = createdBy;
        this.creatorId = creatorId;
    }
}