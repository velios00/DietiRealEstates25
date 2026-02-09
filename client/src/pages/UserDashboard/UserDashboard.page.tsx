import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Avatar,
  Grid,
} from "@mui/material";
import { useUser } from "../../shared/hooks/useUser";
import { getCurrentUser } from "../../services/UserService";
import { getMyOffersWithEstates } from "../../services/OfferService";
import { getMyEstates } from "../../services/EstateService";
import { User } from "../../shared/models/User.model";
import { Roles } from "../../shared/enums/Roles.enum";
import EstateCard from "../../shared/components/EstateCard/EstateCard";
import ChangePasswordButton from "../../shared/components/ChangePasswordButton/ChangePasswordButton";
import {
  mapOfferToListing,
  mapEstateToListing,
} from "../../mappers/EstateToListing.mapper";

export default function UserDashboard() {
  const { user: authUser } = useUser();
  const [userData, setUserData] = useState<User | null>(null);
  const [offers, setOffers] = useState<any[]>([]);
  const [estates, setEstates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [offersLoading, setOffersLoading] = useState(false);
  const [estatesLoading, setEstatesLoading] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getCurrentUser();
      setUserData(response.data);
    } catch (err) {
      console.error("Errore nel caricamento dei dati utente:", err);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMyOffers = async () => {
    setOffersLoading(true);
    try {
      const response = await getMyOffersWithEstates();
      setOffers(response.data || []);
    } catch (err) {
      console.log("Errore nel caricamento delle offerte:", err);
      setOffers([]);
    } finally {
      setOffersLoading(false);
    }
  };

  const fetchMyEstates = async () => {
    setEstatesLoading(true);
    try {
      console.log("🏢 Fetching my estates...");
      const response = await getMyEstates();
      console.log("🏢 Response from getMyEstates:", response);
      console.log("🏢 Response.data:", response.data);
      console.log("🏢 Response.data.results:", response.data?.results);
      setEstates(response.data?.results || []);
    } catch (err) {
      console.log("Errore nel caricamento degli immobili:", err);
      setEstates([]);
    } finally {
      setEstatesLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (!userData) return;

    // Fetch different data based on user role
    if (userData.role === Roles.AGENT || userData.role === Roles.MANAGER) {
      fetchMyEstates();
    } else {
      fetchMyOffers();
    }
  }, [userData]);

  // Get user initials for avatar
  const getInitials = () => {
    if (!userData?.name && !userData?.surname) return "U";
    const firstInitial = userData.name?.charAt(0)?.toUpperCase() || "";
    const lastInitial = userData.surname?.charAt(0)?.toUpperCase() || "";
    return `${firstInitial}${lastInitial}`;
  };

  const isLoading = loading && !userData;

  if (isLoading) {
    return (
      <Box sx={{ minHeight: "100vh", backgroundColor: "#d4d2d2", py: 4 }}>
        <Box sx={{ mb: 12 }}></Box>
        <Container>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
            <CircularProgress sx={{ color: "#62A1BA" }} />
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#d4d2d2", py: 4 }}>
      <Box sx={{ mb: 12 }}></Box>

      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{ borderRadius: 4, overflow: "hidden", backgroundColor: "white" }}
        >
          {/* SEZIONE SUPERIORE: Info Utente */}
          {userData && (
            <Box sx={{ p: 4, borderBottom: "1px solid #eee" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 3,
                  mb: 3,
                }}
              >
                {/* Avatar con iniziali */}
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    border: "3px solid #62A1BA",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    backgroundColor: "#62A1BA",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                  }}
                >
                  {getInitials()}
                </Avatar>

                {/* Informazioni Utente */}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, mb: 1, color: "#2c3e50" }}
                  >
                    {userData.name && userData.surname
                      ? `${userData.name} ${userData.surname}`
                      : "Utente"}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#5d6d7e", mb: 2, lineHeight: 1.6 }}
                  >
                    {userData.email}
                  </Typography>
                  {userData.userAddress && (
                    <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
                      <strong>Indirizzo:</strong> {userData.userAddress}
                    </Typography>
                  )}
                </Box>

                {/* Pulsante Cambia Password */}
                <ChangePasswordButton />
              </Box>
            </Box>
          )}

          {/* SEZIONE INFERIORE: Le Mie Offerte / I Miei Immobili */}
          <Box sx={{ p: 4, position: "relative", minHeight: "200px" }}>
            {(offersLoading || estatesLoading) && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress sx={{ color: "#62A1BA" }} />
              </Box>
            )}

            {userData?.role === Roles.AGENT ||
            userData?.role === Roles.MANAGER ? (
              <>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, mb: 4, color: "#2c3e50" }}
                >
                  I Miei Immobili ({estates.length})
                </Typography>

                {estates.length === 0 && !estatesLoading ? (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    textAlign="center"
                    py={4}
                  >
                    Non hai ancora caricato nessun immobile.
                  </Typography>
                ) : (
                  <Grid container spacing={4}>
                    {estates.map((estate) => {
                      try {
                        const listing = mapEstateToListing(estate);
                        return (
                          <Grid
                            key={estate.idRealEstate}
                            size={{ xs: 12, sm: 6, md: 6 }}
                          >
                            <EstateCard listing={listing} />
                          </Grid>
                        );
                      } catch (error) {
                        console.error(
                          "Errore nel mapping dell'immobile:",
                          error,
                        );
                        return null;
                      }
                    })}
                  </Grid>
                )}
              </>
            ) : (
              <>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, mb: 4, color: "#2c3e50" }}
                >
                  Le Mie Offerte ({offers.length})
                </Typography>

                {offers.length === 0 && !offersLoading ? (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    textAlign="center"
                    py={4}
                  >
                    Non hai ancora fatto offerte su nessun immobile.
                  </Typography>
                ) : (
                  <Grid container spacing={4}>
                    {offers.map((offer) => {
                      try {
                        const listing = mapOfferToListing(offer);
                        return (
                          <Grid
                            key={offer.idOffer}
                            size={{ xs: 12, sm: 6, md: 6 }}
                          >
                            <EstateCard listing={listing} />
                          </Grid>
                        );
                      } catch (error) {
                        console.error(
                          "Errore nel mapping dell'offerta:",
                          error,
                        );
                        return null;
                      }
                    })}
                  </Grid>
                )}
              </>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
