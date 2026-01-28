export class CreateOfferDTO {
  constructor({ amount, inSistem, idRealEstate }) {
    this.amount = amount;
    this.inSistem = inSistem;
    this.idRealEstate = idRealEstate;
  }
}

export class OfferDTO {
  constructor({ id, amount, userName, userSurname }) {
    this.id = id;
    this.amount = amount;
    this.userName = userName;
    this.userSurname = userSurname;
  }
}
