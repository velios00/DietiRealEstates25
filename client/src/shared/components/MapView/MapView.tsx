import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { Box } from "@mui/material";

export default function MapView() {
  const center: LatLngTuple = [51.505, -0.09];

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
        center={center}
        zoom={13}
        style={{
          height: "95%",
          width: "95%",
          borderRadius: "16px",
          border: "1px solid #62A1BA",
        }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </Box>
  );
}
