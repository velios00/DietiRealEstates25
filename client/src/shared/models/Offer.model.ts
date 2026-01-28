export interface Offer {
  idOffer: number;
  idUser: number;
  idRealEstate: number;
  amount: number;
  status: "pending" | "accepted" | "rejected" | "countered";
  dateOffer: string;
  inSistem: boolean;
  userName?: string;
  userSurname?: string;
}

export interface CreateOfferDTO {
  idRealEstate: number;
  amount: number;
  inSistem: boolean;
}

export interface UpdateOfferStatusDTO {
  status: "accepted" | "rejected" | "countered";
  counterAmount?: number;
}
