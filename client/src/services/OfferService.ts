import { API } from "../shared/axios/Interceptors";

interface CreateOffer {
  amount: number;
  inSistem: boolean;
}

interface CounterOffer {
  counterAmount: number;
}

interface UpdateOfferStatus {
  status: "accepted" | "rejected";
}

export function getOffersByRealEstateId(idRealEstate: string | number) {
  return API.get(`/offers/${idRealEstate}`);
}

export function getMyOffers() {
  return API.get(`/offers/my-offers`);
}

export function createOffer(idRealEstate: number, data: CreateOffer) {
  return API.post(`/offers/send/${idRealEstate}`, data);
}

export function createCounterOffer(idOffer: number, data: CounterOffer) {
  return API.patch(`/offers/counter-offer/${idOffer}`, data);
}

export function updateOfferStatus(idOffer: number, data: UpdateOfferStatus) {
  return API.patch(`/offers/${idOffer}/choose-status`, data);
}

export function updateCounterOfferStatus(
  idOffer: number,
  data: UpdateOfferStatus,
) {
  return API.patch(`/offers/counter-offer/${idOffer}/choose-status`, data);
}

export function createExternalOffer(
  data: CreateOffer & { idRealEstate: number },
) {
  return API.post(`/offers/sendOffer/non-sistem`, data);
}
