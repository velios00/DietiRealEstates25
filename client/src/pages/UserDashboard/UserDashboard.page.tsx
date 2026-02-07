import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Button,
  Avatar,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { Lock as LockIcon } from "@mui/icons-material";
import { useUser } from "../../shared/hooks/useUser";
import { getCurrentUser } from "../../services/UserService";
import { getMyOffersWithEstates } from "../../services/OfferService";
import { User } from "../../shared/models/User.model";
import ChangePasswordModal from "../../shared/components/ChangePasswordModal/ChangePasswordModal";
import EstateCard from "../../shared/components/EstateCard/EstateCard";
import { mapOfferToListing } from "../../mappers/EstateToListing.mapper";

export default function UserDashboard() {
  const { user: authUser } = useUser();
  const [userData, setUserData] = useState<User | null>(null);
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [offersLoading, setOffersLoading] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

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

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.allSettled([fetchUserData(), fetchMyOffers()]);
      } catch (err) {
        console.log("Errore nel caricamento dei dati della pagina:", err);
      }
    };
    loadData();
  }, [fetchUserData]);

  const handleChangePassword = () => {
    setPasswordModalOpen(true);
  };

  const handlePasswordChangeSuccess = () => {
    setSnackbar({
      open: true,
      message:
        "Password modificata con successo! Per sicurezza, effettua nuovamente l'accesso.",
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

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
                <Button
                  variant="contained"
                  startIcon={<LockIcon />}
                  onClick={handleChangePassword}
                  sx={{
                    backgroundColor: "#62A1BA",
                    fontSize: "1rem",
                    fontWeight: 600,
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
                    whiteSpace: "nowrap",
                    "&:hover": {
                      backgroundColor: "#4a8ba3",
                    },
                  }}
                >
                  Cambia Password
                </Button>
              </Box>
            </Box>
          )}

          {/* SEZIONE INFERIORE: Le Mie Offerte */}
          <Box sx={{ p: 4, position: "relative", minHeight: "200px" }}>
            {offersLoading && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress sx={{ color: "#62A1BA" }} />
              </Box>
            )}

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
                      <Grid key={offer.idOffer} size={{ xs: 12, sm: 6, md: 6 }}>
                        <EstateCard listing={listing} />
                      </Grid>
                    );
                  } catch (error) {
                    console.error("Errore nel mapping dell'offerta:", error);
                    return null;
                  }
                })}
              </Grid>
            )}
          </Box>
        </Paper>
      </Container>

      {/* Change Password Modal */}
      <ChangePasswordModal
        open={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onSuccess={handlePasswordChangeSuccess}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
