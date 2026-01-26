import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import MapView from "../../shared/components/MapView/MapView";
import ImageGallery from "../../shared/components/ImageGallery/ImageGallery";
import EstateInfoCard from "../../shared/components/EstateInfoCard/EstateInfoCard";
import { Estate } from "../../shared/models/Estate.model";
import { LatLngTuple } from "leaflet";
import Header from "../../shared/components/Header/Header";
import { useEffect } from "react";

export default function EstateView() {
  const { id } = useParams<{ id: string }>();
  const [estate, setEstate] = useState<Estate | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - sostituire con vera API call
  const mockEstate: Estate = {
    idEstate: 1,
    title: "Appartamento del cuore a Napoli",
    photos: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
      "https://images.unsplash.com/photo-1630957389211-ea4881eb00f5?w=600",
      "https://images.unsplash.com/photo-1616394335336-cbf50dd94188?w=600",
      "https://images.unsplash.com/photo-1596178065887-ba8ecb13b577?w=600",
      "https://images.unsplash.com/photo-1576941089067-2de3dd663007?w=600",
    ],
    description: `L'appartamento del cuore e' l'appartamento dei sogni ti giuro localizzato nel quartiere piu' malfamato di Napoli. Un ampio locale con 2 bagni. Al centro di Napoli, dove il sole non sorge. Poi ci sono pure 4 spiriti maledetti capi, non puoi mai saperlo`,
    price: 320000,
    size: 94,
    nRooms: 4,
    nBathrooms: 2,
    energyClass: "B",
    floor: 3,
    type: "Appartamento",
    place: {
      city: "Napoli",
      street: "Via Leone di Lernia 32",
      lat: "40.8518",
      lon: "14.2681",
    },
    creationDate: "2024-01-15",
  };

  useEffect(() => {
    setLoading(false);
    setEstate(mockEstate);
  }, [id]);

  if (loading || !estate) {
    return <div>Loading...</div>;
  }

  const mapCenter: LatLngTuple = [
    parseFloat(estate.place.lat || "40.8518"),
    parseFloat(estate.place.lon || "14.2681"),
  ];

  return (
    <>
      <Header />
      <Box sx={{ height: "64px" }} />

      <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="lg">
          {/* Titolo */}
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
            {estate.title}
          </Typography>

          <Grid container spacing={3}>
            <ImageGallery photos={estate.photos} title={estate.title} />
            {/* SINISTRA - Immagini, descrizione, mappa */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {/* Descrizione - allineata con l'immagine grande */}
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#666",
                      lineHeight: 1.8,
                      fontSize: "0.95rem",
                    }}
                  >
                    {estate.description}
                  </Typography>
                </Paper>

                {/* Mappa */}
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                    height: 400,
                  }}
                >
                  <MapView estates={[estate]} center={mapCenter} />
                </Box>
              </Box>
            </Grid>

            {/* DESTRA - Spazio vuoto sopra, poi Info Card allineata alle foto piccole */}
            <Grid
              size={{ xs: 12, md: 4 }}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              {/* Card Info - inizia qui, allineata alle foto piccole */}
              <EstateInfoCard estate={estate} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
