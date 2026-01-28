import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Grid, Paper, Typography, Button } from "@mui/material";
import MapView from "../../shared/components/MapView/MapView";
import ImageGallery from "../../shared/components/ImageGallery/ImageGallery";
import EstateInfoCard from "../../shared/components/EstateInfoCard/EstateInfoCard";
import OfferHistoryModal from "../../shared/components/Offer/OfferHistoryModal/OfferHistoryModal";
// import MakeOfferModal from "../../shared/components//Offer/MakeOfferModal/MakeOfferModal";
import { Estate } from "../../shared/models/Estate.model";
import { LatLngTuple } from "leaflet";
import { getEstateById } from "../../services/EstateService";
import { useUser } from "../../shared/hooks/useUser";
import { Offer } from "../../shared/models/Offer.model";
import {
  getOffersByRealEstateId,
  createOffer,
  formatDisplayName,
  calculateHighestOffer,
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
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [currentUserFullName, setCurrentUserFullName] = useState<string | null>(
    null,
  );

  // Stato per i modali
  const [offerHistoryOpen, setOfferHistoryOpen] = useState(false);
  //  const [makeOfferOpen, setMakeOfferOpen] = useState(false);
  //  const [submittingOffer, setSubmittingOffer] = useState(false);

  const isAuthenticated = !!user;
  const userRole = user?.role;
  const idUser = user?.idUser;

  const startingPrice = estate?.price || 320000;
  const highestOffer = calculateHighestOffer(offers, startingPrice);

  // Determina se l'utente può fare offerte
  const canMakeOffer = userCanMakeOffer(user);

  useEffect(() => {
    if (!idEstate) return;

    getEstateById(idEstate)
      .then(({ data }) => {
        setEstate(data);
        setLoading(false);
        fetchOffers(data.idRealEstate);
      })
      .catch((error) => {
        console.error("Errore nel caricamento dell'immobile:", error);
        setLoading(false);
      });
  }, [idEstate]);

  const fetchOffers = async (estateId: number) => {
    try {
      setLoadingOffers(true);
      const { data } = await getOffersByRealEstateId(estateId);
      setOffers(data);
    } catch (error) {
      console.error("Errore nel caricamento delle offerte:", error);
      setOffers([]);
    } finally {
      setLoadingOffers(false);
    }
  };

  if (user) {
    const fetchCurrentUserDetails = async () => {
      try {
        const response = await getUserById(idUser);
        const fullName = response.data.name + " " + response.data.surname;
        setCurrentUserFullName(fullName);
      } catch (error) {
        console.error("Errore nel caricamento dei dettagli utente:", error);
      }
    };

    const fullName = fetchCurrentUserDetails();
  }

  /*const handleSubmitOffer = async (offerAmount: number) => {
    if (!estate || !user) return;

    setSubmittingOffer(true);
    try {
      const { data: newOffer } = await createOffer({
        idRealEstate: estate.idEstate,
        amount: offerAmount,
        inSistem: true,
      });

      // Formatta la nuova offerta per la visualizzazione
      const formattedOffer = {
        ...newOffer,
        displayName: formatDisplayName(newOffer, userRole),
      };

      // Aggiungi la nuova offerta alla lista
      setOffers([formattedOffer, ...offers]);

      // Chiudi il modal dopo il successo
      setMakeOfferOpen(false);
    } catch (error) {
      console.error("Errore nell'invio dell'offerta:", error);
      throw error;
    } finally {
      setSubmittingOffer(false);
    }
  };
*/

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
              <EstateInfoCard estate={estate} />

              {/* Sezione Offerte */}
              <Paper
                sx={{
                  p: 3,
                  mt: 3,
                  borderRadius: 3,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                }}
              >
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Offerte
                </Typography>

                <Box mb={3}>
                  <Typography variant="body2" color="#5d6d7e" mb={1}>
                    Prezzo di partenza
                  </Typography>
                  <Typography variant="h5" fontWeight={700} color="#2c3e50">
                    ${startingPrice.toLocaleString()}
                  </Typography>
                </Box>

                {loadingOffers ? (
                  <Box display="flex" justifyContent="center" py={2}>
                    <Typography>Caricamento offerte...</Typography>
                  </Box>
                ) : (
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => setOfferHistoryOpen(true)}
                      disabled={offers.length === 0}
                      sx={{
                        backgroundColor: "#f0f7fa",
                        color: "#62A1BA",
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "#e0f0f7",
                        },
                        "&.Mui-disabled": {
                          backgroundColor: "#f5f5f5",
                          color: "#999",
                        },
                      }}
                    >
                      {offers.length === 0
                        ? "Nessuna offerta disponibile"
                        : `Visualizza Storico (${offers.length})`}
                    </Button>

                    <Button
                      variant="contained"
                      fullWidth
                      // onClick={() => setMakeOfferOpen(true)}
                      disabled={!canMakeOffer}
                      sx={{
                        backgroundColor: canMakeOffer ? "#62A1BA" : "#cccccc",
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: canMakeOffer ? "#4a8ba3" : "#cccccc",
                        },
                      }}
                    >
                      {!isAuthenticated
                        ? "Accedi per fare un'offerta"
                        : userRole !== "user"
                          ? "Solo utenti possono fare offerte"
                          : "Proponi Offerta"}
                    </Button>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Modali */}
      <OfferHistoryModal
        open={offerHistoryOpen}
        onClose={() => setOfferHistoryOpen(false)}
        offers={offers}
        startingPrice={startingPrice}
        currentUserRole={userRole}
        currentUserFullName={user ? currentUserFullName : null}
      />
    </>
  );
}
