import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import MapView from "../../shared/components/MapView/MapView";
import ImageGallery from "../../shared/components/ImageGallery/ImageGallery";
import EstateInfoCard from "../../shared/components/EstateInfoCard/EstateInfoCard";
import OfferModal from "../../shared/components/OfferModal/OfferModal";
import { Estate } from "../../shared/models/Estate.model";
import { LatLngTuple } from "leaflet";
import { useEffect } from "react";
import { getEstateById } from "../../services/EstateService";

export default function EstateView() {
  const { id } = useParams<{ id: string }>();
  const [estate, setEstate] = useState<Estate | null>(null);
  const [loading, setLoading] = useState(true);
  const [openOfferModal, setOpenOfferModal] = useState(false);

  useEffect(() => {
    if (!id) return;

    getEstateById(id)
      .then(({ data }) => {
        setEstate(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Errore nel caricamento dell'immobile:", error);
        setLoading(false);
      });
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
              <EstateInfoCard
                estate={estate}
                onOfferClick={() => setOpenOfferModal(true)}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <OfferModal
        open={openOfferModal}
        onClose={() => setOpenOfferModal(false)}
        estateId={estate.idRealEstate}
        estatePrice={estate.price}
        onSubmit={(offerPrice) => {
          console.log("Offerta proposta:", offerPrice);
          setOpenOfferModal(false);
          // Qui andrà la logica per inviare l'offerta al server
        }}
      />
    </>
  );
}
