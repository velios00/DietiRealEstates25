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
