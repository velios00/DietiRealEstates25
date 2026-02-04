import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { Refresh as RefreshIcon, Lock as LockIcon } from "@mui/icons-material";
import { useUser } from "../../shared/hooks/useUser";
import { getUserById } from "../../services/UserService";
import Header from "../../shared/components/Header/Header";
import { User } from "../../shared/models/User.model";
import { Roles } from "../../shared/enums/Roles.enum";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const { user: authUser, role } = useUser();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user has USER role
  useEffect(() => {
    if (role && role !== Roles.USER) {
      // Redirect to appropriate dashboard or home page
      navigate("/");
    }
  }, [role, navigate]);

  const fetchUserData = useCallback(async () => {
    if (!authUser?.idUser) return;

    try {
      setLoading(true);
      const response = await getUserById(authUser.idUser);
      setUserData(response.data);
    } catch (err) {
      console.error("Errore nel caricamento dei dati utente:", err);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  }, [authUser?.idUser]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleChangePassword = () => {
    // TODO: Implementare la logica per il cambio password
    console.log("Cambio password");
  };

  // Don't render anything if user doesn't have USER role
  if (role && role !== Roles.USER) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#d4d2d2",
        py: 4,
      }}
    >
      <Box sx={{ mb: 12 }}>
        <Header />
      </Box>

      <Container sx={{ mt: 4, mb: 4 }}>
        {/* Welcome Section */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: 4 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Benvenuto, {authUser?.email || "Utente"}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Visualizza e gestisci i tuoi dati personali
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchUserData}
              disabled={loading}
              sx={{
                borderColor: "#62A1BA",
                color: "#62A1BA",
                fontSize: "1rem",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#4a8ba3",
                  color: "#4a8ba3",
                  backgroundColor: "transparent",
                },
              }}
            >
              Aggiorna
            </Button>
          </Box>
        </Paper>

        {/* User Data Section */}
        <Paper sx={{ p: 3, borderRadius: 4 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 3, color: "#2c3e50" }}
          >
            I Miei Dati
          </Typography>

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "300px",
              }}
            >
              <CircularProgress sx={{ color: "#62A1BA" }} />
            </Box>
          ) : userData ? (
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        width: "30%",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      ID Utente
                    </TableCell>
                    <TableCell sx={{ borderBottom: "1px solid #e0e0e0" }}>
                      {userData.idUser}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      Email
                    </TableCell>
                    <TableCell sx={{ borderBottom: "1px solid #e0e0e0" }}>
                      {userData.email}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      Nome
                    </TableCell>
                    <TableCell sx={{ borderBottom: "1px solid #e0e0e0" }}>
                      {userData.name || "Non specificato"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      Cognome
                    </TableCell>
                    <TableCell sx={{ borderBottom: "1px solid #e0e0e0" }}>
                      {userData.surname || "Non specificato"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      Indirizzo
                    </TableCell>
                    <TableCell sx={{ borderBottom: "1px solid #e0e0e0" }}>
                      {userData.userAddress || "Non specificato"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      Ruolo
                    </TableCell>
                    <TableCell sx={{ borderBottom: "1px solid #e0e0e0" }}>
                      {userData.role}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      Password
                    </TableCell>
                    <TableCell sx={{ borderBottom: "1px solid #e0e0e0" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography sx={{ letterSpacing: "0.2em" }}>
                          ••••••••
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<LockIcon />}
                          onClick={handleChangePassword}
                          sx={{
                            backgroundColor: "#62A1BA",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            px: 2,
                            py: 1,
                            "&:hover": {
                              backgroundColor: "#4a8ba3",
                            },
                          }}
                        >
                          Cambia Password
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
              py={8}
            >
              Impossibile caricare i dati utente.
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
