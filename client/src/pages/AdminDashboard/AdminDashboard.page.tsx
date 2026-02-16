import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  LinearProgress,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  Add as AddIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import { getAllAgencies } from "../../services/AgencyService";
import { createAdmin } from "../../services/UserService";
import { CreateAdmin } from "../../shared/models/Admin.model";
import Header from "../../shared/components/Header/Header";
import AgencyTable from "../../shared/components/AdminDashboardComps/AgencyTable/AgencyTable";
import CreateAgencyModal from "../../shared/components/AdminDashboardComps/CreateAgencyModal";
import CreateAdminModal from "../../shared/components/AdminDashboardComps/CreateAdminModal";
import ChangePasswordButton from "../../shared/components/ChangePasswordButton/ChangePasswordButton";
import { toast } from "react-hot-toast";
import { Agency } from "../../shared/models/Agency.model";

export default function AdminDashboard() {
  const [agencies, setAgencies] = useState<Agency[]>([]);

  const [loading, setLoading] = useState(true);

  const [isCreateAgencyModalOpen, setIsCreateAgencyModalOpen] = useState(false);

  const [isCreateAdminModalOpen, setIsCreateAdminModalOpen] = useState(false);

  const fetchAgencies = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllAgencies();
      setAgencies(response || []);
    } catch (err) {
      console.error("Error fetching agencies:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgencies();
  }, [fetchAgencies]);

  const handleCreateAgency = async () => {
    try {
      await fetchAgencies();
      toast.success("Agenzia creata con successo!");
      setIsCreateAgencyModalOpen(false);
    } catch (err) {
      console.error("Errore nel ricaricamento delle agenzie:", err);
    }
  };
  const handleCreateAdmin = async (adminData: CreateAdmin) => {
    try {
      // Chiama il servizio per creare l'admin
      await createAdmin(adminData);
      toast.success("Admin creato con successo!");
      setIsCreateAdminModalOpen(false);
    } catch (err: any) {
      console.error("Errore nella creazione dell'admin:", err);

      // Gestisci gli errori specifici
      if (err.response?.status === 400) {
        toast.error("Email già registrata");
      } else if (err.response?.status === 401) {
        toast.error("Non autorizzato");
      } else {
        toast.error("Errore durante la creazione dell'admin");
      }
    }
  };

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
        {/* Header with Create Admin button */}
        <Box sx={{ mb: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 4 }}>
            <Box
              display="flex"
              alignItems={{ xs: "stretch", sm: "center" }}
              justifyContent="space-between"
              flexDirection={{ xs: "column", sm: "row" }}
              gap={{ xs: 2, sm: 3 }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                  textAlign: { xs: "center", sm: "left" },
                  fontSize: { xs: "1.25rem", sm: "1.4rem", md: "1.5rem" },
                  lineHeight: { xs: 1.25, sm: 1.3, md: 1.35 },
                }}
              >
                Gestione Amministrazione
              </Typography>
              <Box
                display="flex"
                gap={2}
                flexDirection={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "stretch", sm: "center" }}
              >
                <ChangePasswordButton />
                <Button
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                  onClick={() => setIsCreateAdminModalOpen(true)}
                  sx={{
                    backgroundColor: "#62A1BA",
                    fontSize: { xs: "0.875rem", sm: "0.95rem", md: "1rem" },
                    fontWeight: 600,
                    px: { xs: 2, sm: 2.5, md: 3 },
                    py: { xs: 1, sm: 1.25, md: 1.5 },
                    minHeight: 48,
                    width: { xs: "100%", sm: "auto" },
                    whiteSpace: { xs: "normal", sm: "nowrap" },
                    borderRadius: 999,
                    "&:hover": {
                      backgroundColor: "#4a8ba3",
                    },
                  }}
                >
                  Crea Admin
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
        {/* Agency Management Section */}
        <Paper sx={{ p: 3, borderRadius: 4 }}>
          <Box
            display="flex"
            alignItems={{ xs: "stretch", sm: "center" }}
            justifyContent="space-between"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={{ xs: 2, sm: 3 }}
            mb={3}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                textAlign: { xs: "center", sm: "left" },
                fontSize: { xs: "1.25rem", sm: "1.4rem", md: "1.5rem" },
                lineHeight: { xs: 1.25, sm: 1.3, md: 1.35 },
              }}
            >
              Gestione Agenzie
            </Typography>
            <Box
              display="flex"
              gap={2}
              flexDirection={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "stretch", sm: "center" }}
            >
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={fetchAgencies}
                disabled={loading}
                sx={{
                  borderColor: "#62A1BA",
                  color: "#62A1BA",
                  fontSize: { xs: "0.875rem", sm: "0.95rem", md: "1rem" },
                  fontWeight: 600,
                  px: { xs: 2, sm: 2.5, md: 3 },
                  py: { xs: 1, sm: 1.25, md: 1.5 },
                  width: { xs: "100%", sm: "auto" },
                  whiteSpace: { xs: "normal", sm: "nowrap" },
                  borderRadius: 999,
                  "&:hover": {
                    borderColor: "#4a8ba3",
                    color: "#4a8ba3",
                    backgroundColor: "transparent",
                  },
                }}
              >
                Aggiorna
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setIsCreateAgencyModalOpen(true)}
                sx={{
                  backgroundColor: "#62A1BA",
                  fontSize: { xs: "0.875rem", sm: "0.95rem", md: "1rem" },
                  fontWeight: 600,
                  px: { xs: 2, sm: 2.5, md: 3 },
                  py: { xs: 1, sm: 1.25, md: 1.5 },
                  width: { xs: "100%", sm: "auto" },
                  whiteSpace: { xs: "normal", sm: "nowrap" },
                  borderRadius: 999,
                  "&:hover": {
                    backgroundColor: "#4a8ba3",
                  },
                }}
              >
                Crea Agenzia
              </Button>
            </Box>
          </Box>

          {loading && <LinearProgress sx={{ mb: 2 }} />}

          <AgencyTable agencies={agencies} loading={loading} />
        </Paper>
      </Container>

      {/* Create Admin Modal */}
      <CreateAdminModal
        open={isCreateAdminModalOpen}
        onClose={() => setIsCreateAdminModalOpen(false)}
        onSubmit={handleCreateAdmin}
      />

      {/* Create Agency Modal */}
      <CreateAgencyModal
        open={isCreateAgencyModalOpen}
        onClose={() => setIsCreateAgencyModalOpen(false)}
        onSubmit={handleCreateAgency}
      />
    </Box>
  );
}
