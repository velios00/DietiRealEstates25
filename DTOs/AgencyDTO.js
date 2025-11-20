export class CreateAgencyDTO {
    constructor({ agencyName, address, description, profileImage, phoneNumber, url, manager }){
        this.agencyName = agencyName;
        this.address = address;
        this.description = description;
        this.profileImage = profileImage;
        this.phoneNumber = phoneNumber;
        this.url = url;
        this.manager = manager;
    }

}