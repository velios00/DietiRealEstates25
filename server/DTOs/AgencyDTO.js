export class CreateAgencyDTO {
  constructor({
    agencyName,
    address,
    description,
    profileImage,
    phoneNumber,
    url,
    manager,
  }) {
    this.agencyName = agencyName;
    this.address = address;
    this.description = description;
    this.profileImage = profileImage;
    this.phoneNumber = phoneNumber;
    this.url = url;
    this.manager = manager;
  }
}

export class AgencyDTO {
  constructor({
    idAgency,
    agencyName,
    idManager,
    address,
    description,
    profileImage,
    phoneNumber,
    url,
    managerName,
  }) {
    this.idAgency = idAgency;
    this.agencyName = agencyName;
    this.address = address;
    this.description = description;
    this.profileImage = profileImage;
    this.phoneNumber = phoneNumber;
    this.url = url;
    this.idManager = idManager;
    this.managerName = managerName;
  }
}
