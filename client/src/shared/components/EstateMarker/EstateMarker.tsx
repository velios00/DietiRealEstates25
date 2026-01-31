import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
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

  const markerIcon = L.icon({
    iconUrl:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        "<svg xmlns='http://www.w3.org/2000/svg' width='25' height='41' viewBox='0 0 25 41'><path d='M12.5 0C5.6 0 0 5.6 0 12.5 0 22 12.5 41 12.5 41S25 22 25 12.5C25 5.6 19.4 0 12.5 0z' fill='%2362A1BA'/><circle cx='12.5' cy='12.5' r='5.5' fill='white'/></svg>",
      ),
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <Marker position={position} icon={markerIcon}>
      <Popup maxWidth={420} className="estate-popup">
        <EstateCardCompact listing={listing} />
      </Popup>
    </Marker>
  );
}
