import { Listing } from "../shared/components/EstateCard/EstateCard";
import { Estate } from "../shared/models/Estate.model";

export function mapEstateToListing(estate: Estate): Listing {
  return {
    id: estate.idEstate,
    title: estate.title,
    address: estate.place.city,
    price: estate.price,
    beds: estate.nBeds,
    baths: estate.nBathrooms,
    size: estate.size,
    photos: estate.photos ? [estate.photos[0]] : [""],
    type: estate.type ?? "Vendita",
  };
}
