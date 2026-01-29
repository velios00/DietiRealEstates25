import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Grid, Paper, Typography, Button } from "@mui/material";
import MapView from "../../shared/components/MapView/MapView";
import ImageGallery from "../../shared/components/ImageGallery/ImageGallery";
import EstateInfoCard from "../../shared/components/EstateInfoCard/EstateInfoCard";
import OfferModal from "../../shared/components/OfferModal/OfferModal";
import { Estate } from "../../shared/models/Estate.model";
import { LatLngTuple } from "leaflet";
import { getEstateById } from "../../services/EstateService";
import { useUser } from "../../shared/hooks/useUser";
import { Offer } from "../../shared/models/Offer.model";
import {
  getOffersByRealEstateId,
  createOffer,
} from "../../services/OfferService";
import {
  getUserById,
  canMakeOffer as userCanMakeOffer,
} from "../../services/UserService";

export default function EstateView() {
  const { idEstate } = useParams<{ idEstate: string }>();
  const { user } = useUser();

  const [estate, setEstate] = useState<Estate | null>(null);
  const [loading, setLoading] = useState(true);
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Consolidated data fetching
  useEffect(() => {
    if (!idEstate) return;

    setLoading(true);
    getEstateById(idEstate)
      .then(({ data }) => {
        setEstate(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Errore nel caricamento:", err);
        setError("Impossibile caricare l'immobile");
      })
      .finally(() => setLoading(false));
  }, [idEstate]);

  const handleSubmitOffer = async (offerAmount: number) => {
    if (!estate || !user) return;

    try {
      // Cleaned up the non-existent variables (userRole, formatDisplayName)
      await createOffer({
        idRealEstate: estate.idRealEstate, // Using correct ID property
        amount: offerAmount,
        inSistem: true,
      });

      setOpenOfferModal(false);
      // Optional: Re-fetch or update local state here if needed
    } catch (error) {
      console.error("Errore nell'invio dell'offerta:", error);
      alert("Si è verificato un errore durante l'invio dell'offerta.");
    }
  };

  if (loading) return <Box sx={{ p: 4 }}>Caricamento in corso...</Box>;
  if (error || !estate)
    return <Box sx={{ p: 4 }}>{error || "Immobile non trovato."}</Box>;

  // Safe check for place coordinates
  const mapCenter: LatLngTuple = [
    parseFloat(estate.place?.lat || "40.8518"),
    parseFloat(estate.place?.lon || "14.2681"),
  ];

  return (
    <>
      <Box sx={{ height: "64px" }} />

      <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
            {estate.title}
          </Typography>

          <Grid container spacing={3}>
            <ImageGallery photos={estate.photos} title={estate.title} />

            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
        onSubmit={handleSubmitOffer}
      />
    </>
  );
}
