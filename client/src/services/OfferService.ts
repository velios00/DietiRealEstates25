import { API } from "../shared/axios/Interceptors";

export function getOffersByRealEstateId(idRealEstate: string | number) {
  return API.get(`/offers/${idRealEstate}`);
}
