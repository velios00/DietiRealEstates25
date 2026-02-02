import { Listing } from "../shared/components/EstateCard/EstateCard";
import { Estate } from "../shared/models/Estate.model";

export function cleanAddress(address: string): string {
  // Rimuove il CAP (5 cifre) e "Italy" dall'indirizzo
  return address
    .replace(/,?\s*\d{5}\s*/g, ", ")
    .replace(/,?\s*Italy\s*$/i, "")
    .replace(/,\s*,/g, ",")
    .trim();
}

export function mapEstateToListing(estate: Estate): Listing {
  const fullAddress = estate.place.address || estate.place.city;
  const addressWithoutPostalCode = fullAddress
    ? cleanAddress(fullAddress)
    : estate.place.city;

  return {
    id: estate.idRealEstate || estate.idEstate || estate.id,
    title: estate.title,
    address: addressWithoutPostalCode,
    price: estate.price,
    rooms: estate.nRooms,
    baths: estate.nBathrooms,
    size: estate.size,
    photos: estate.photos && estate.photos.length > 0 ? estate.photos : [""],
    type: estate.type ?? "Vendita",
  };
}
