import { Marker, Popup } from "react-leaflet";
import EstateCardCompact, { Listing } from "../EstateCard/EstateCardCompact";
import { cleanAddress } from "../../../mappers/EstateToListing.mapper";

interface EstateMarkerProps {
  estate: {
    idEstate: number;
    id: number;
    title: string;
    price: number;
    address?: string;
    photos: string[];
    type: string;
    nRooms: number;
    nBathrooms: number;
    size: number;
    place: {
      address?: string;
      city: string;
      street?: string;
      lat?: string;
      lon?: string;
    };
  };
}

export default function EstateMarker({ estate }: EstateMarkerProps) {
  if (!estate?.place?.lat || !estate?.place?.lon) return null;

  const position: [number, number] = [
    parseFloat(estate.place.lat as string),
    parseFloat(estate.place.lon as string),
  ];

  // Mappare i dati al formato Listing compatto
  const listing: Listing = {
    id: estate.id,
    title: estate.title,
    address: cleanAddress(
      estate.place.address || estate.address || estate.place.city,
    ),
    price: estate.price,
    photos: estate.photos || [],
    type: estate.type,
  };

  return (
    <Marker position={position}>
      <Popup maxWidth={420} className="estate-popup">
        <EstateCardCompact listing={listing} />
      </Popup>
    </Marker>
  );
}
