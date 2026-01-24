import { Marker, Popup } from "react-leaflet";

interface EstateMarkerProps {
  estate: {
    idEstate: number;
    title: string;
    price: number;
    place: {
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

  return (
    <Marker position={position}>
      <Popup>
        <div style={{ minWidth: "200px" }}>
          <h3 style={{ margin: "0 0 8px 0", fontSize: "16px" }}>
            {estate.title}
          </h3>
          <p style={{ margin: "4px 0", color: "#62A1BA", fontWeight: "bold" }}>
            €{estate.price.toLocaleString()}
          </p>
          <p style={{ margin: "4px 0", fontSize: "14px" }}>
            {estate.place.street && `${estate.place.street}, `}
            {estate.place.city}
          </p>
        </div>
      </Popup>
    </Marker>
  );
}
