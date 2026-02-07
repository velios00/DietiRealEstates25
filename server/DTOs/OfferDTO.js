export class CreateOfferDTO {
  constructor({ amount, inSistem, idRealEstate }) {
    this.amount = amount;
    this.inSistem = inSistem;
    this.idRealEstate = idRealEstate;
  }
}

export class OfferDTO {
  constructor({
    idOffer,
    idUser,
    idRealEstate,
    amount,
    userName,
    userSurname,
    status,
    dateOffer,
    inSistem,
    counterOfferAmount,
    realEstate,
  }) {
    this.idOffer = idOffer;
    this.idUser = idUser;
    this.idRealEstate = idRealEstate;
    this.amount = amount;
    this.userName = userName;
    this.userSurname = userSurname;
    this.status = status;
    this.dateOffer = dateOffer;
    this.inSistem = inSistem;
    this.counterOfferAmount = counterOfferAmount;
    this.realEstate = realEstate;
  }

  get statusLabel() {
    const labels = {
      pending: "In Attesa",
      accepted: "Accettata",
      rejected: "Rifiutata",
      counter_offer: "Controproposta",
    };
    return labels[this.status] || this.status;
  }
}
