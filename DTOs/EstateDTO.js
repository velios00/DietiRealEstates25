export class createEstateDTO {
    constructor({ description, photo, price, size, idAgency }){
        this.description = description;
        this.photo = photo;
        this.price = price;
        this.size = size;
        this.idAgency = idAgency;
    }
}