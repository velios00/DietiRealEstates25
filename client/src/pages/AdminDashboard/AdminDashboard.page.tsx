import { useState, useEffect } from "react";
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
import { createAgency, getAllAgencies } from "../../services/AgencyService";
import { createAdmin } from "../../services/UserService";
import Header from "../../shared/components/Header/Header";
import { CreateAdminDTO } from "../../shared/models/User.model";
import AgencyTable from "../../shared/components/admin/AgencyTable/AgencyTable";
import CreateAgencyModal from "../../shared/components/admin/CreateAgencyModal";
import CreateAdminModal from "../../shared/components/admin/CreateAdminModal";
import { toast } from "react-hot-toast";
import {
  AgencyResponse,
  CreateAgencyDTO,
} from "../../shared/models/Agency.model";

export default function AdminDashboard() {
  const [agencies, setAgencies] = useState<AgencyResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [isCreateAdminModalOpen, setIsCreateAdminModalOpen] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);

  const fetchAgencies = async () => {
    setLoading(true);
    try {
      const data = await getAllAgencies();
      setAgencies(data || []);
    } catch (err) {
      console.error("Error fetching agencies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgencies();
  }, []);

  const handleCreateAgency = async (agencyData: CreateAgencyDTO) => {
    try {
      const response = await createAgency(agencyData);
      await fetchAgencies();
      const createdName = response?.agency?.agencyName || "Agenzia";
      toast.success(`Agenzia ${createdName} creata con successo!`);
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error("Errore nella creazione dell'agenzia:", err);
      toast.error("Errore nella creazione dell'agenzia");
    }
  };
  const handleCreateAdmin = async (adminData: CreateAdminDTO) => {
    if (!adminData.email || !adminData.name || !adminData.surname) {
      toast.error("Per favore, compila tutti i campi obbligatori");
      return;
    }
    setAdminLoading(true);
    try {
      const response = await createAdmin(adminData);
      toast.success(
        `Amministratore "${adminData.name} ${adminData.surname}" creato!`,
      );
      setIsCreateAdminModalOpen(false);
      // I dati della password sono in response.data (non in response.data.data)
      console.log("Password temporanea:", response.data.temporaryPassword);
    } catch (err) {
      toast.error("Errore nella creazione dell'amministratore");
      console.error("Errore nella creazione dell'amministratore:", err);
    } finally {
      setAdminLoading(false);
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
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h5" fontWeight="bold">
                Gestione Amministrazione
              </Typography>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                  onClick={() => setIsCreateAdminModalOpen(true)}
                  sx={{
                    backgroundColor: "#62A1BA",
                    fontSize: "1rem",
                    fontWeight: 600,
                    px: 3,
                    py: 1.5,
                    minHeight: 48,
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
            alignItems="center"
            justifyContent="space-between"
            mb={3}
          >
            <Typography variant="h5" fontWeight="bold">
              Gestione Agenzie
            </Typography>
            <Box display="flex" gap={2}>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={fetchAgencies}
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
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setIsCreateModalOpen(true)}
                sx={{
                  backgroundColor: "#62A1BA",
                  fontSize: "1rem",
                  fontWeight: 600,
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
        loading={adminLoading}
      />

      {/* Create Agency Modal */}
      <CreateAgencyModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateAgency}
      />
    </Box>
  );
}
