import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import { Box } from "@mui/material";
import { Estate } from "../../models/Estate.model";
import { useEffect } from "react";
import { useMap } from "react-leaflet/hooks";
import EstateMarker from "../EstateMarker/EstateMarker";

function ChangeView({ center }: { center: LatLngTuple }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
}

interface MapViewProps {
  estates: Estate[];
  center?: LatLngTuple;
  isLoading?: boolean;
  radiusKm?: number;
}

export default function MapView({
  estates,
  center,
  isLoading,
  radiusKm,
}: MapViewProps) {
  const defaultCenter: LatLngTuple = [51.505, -0.09];
  const mapCenter = center || defaultCenter;
  const radiusMeters = radiusKm ? radiusKm * 1000 : undefined;
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 1.5,
      }}
    >
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{
          height: "95%",
          width: "95%",
          borderRadius: "16px",
          border: "1px solid #62A1BA",
        }}
        scrollWheelZoom={true}
      >
        <ChangeView center={mapCenter} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {radiusMeters && (
          <Circle
            center={mapCenter}
            radius={radiusMeters}
            pathOptions={{
              color: "#62A1BA",
              fillColor: "#62A1BA",
              fillOpacity: 0.15,
            }}
          />
        )}
        {estates.map((estate) => (
          <EstateMarker
            key={estate.idRealEstate || estate.idEstate || estate.id}
            estate={estate}
          />
        ))}
      </MapContainer>
    </Box>
  );
}
