import { API } from "../shared/axios/Interceptors";
import {
  Offer,
  CreateOfferDTO,
  UpdateOfferStatusDTO,
} from "../shared/models/Offer.model";

export function getOffersByRealEstateId(idRealEstate: string | number) {
  return API.get<Offer[]>(`/offers/${idRealEstate}`);
}

export function createOffer(offerData: CreateOfferDTO) {
  return API.post<Offer>("/offers/send", offerData);
}

export function updateOfferStatus(
  idOffer: number,
  statusData: UpdateOfferStatusDTO,
) {
  return API.put<Offer>(`/offers/${idOffer}/status`, statusData);
}

export function getUserOffers() {
  return API.get<Offer[]>("/offers/user/my-offers");
}

export function formatDisplayName(
  offer: Offer,
  currentUserRole?: string,
): string {
  // If manager/agent and real name is available, use it
  if (
    (currentUserRole === "manager" || currentUserRole === "agent") &&
    offer.userName &&
    offer.userSurname
  ) {
    return `${offer.userName} ${offer.userSurname}`;
  }

  return offer.userName + " " + offer.userSurname;
}

export function calculateHighestOffer(
  offers: Offer[],
  startingPrice: number,
): number {
  if (!offers || offers.length === 0) {
    return startingPrice;
  }

  return offers.reduce(
    (max, offer) => Math.max(max, offer.amount),
    startingPrice,
  );
}
