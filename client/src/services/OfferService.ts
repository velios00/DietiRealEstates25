import { API } from "../shared/axios/Interceptors";

export function getOffersByRealEstateId(idRealEstate: string | number) {
  return API.get(`/offers/${idRealEstate}`);
}

export function createOffer(data: {
  idRealEstate: number;
  amount: number;
  inSistem: boolean;
}) {
  return API.post("/offers", data);
}
