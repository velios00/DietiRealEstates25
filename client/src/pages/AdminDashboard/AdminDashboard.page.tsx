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
import { getAllAdmins } from "../../services/UserService";
import Header from "../../shared/components/Header/Header";
import AgencyTable from "../../shared/components/AdminDashboardComps/AgencyTable/AgencyTable";
import CreateAgencyModal from "../../shared/components/AdminDashboardComps/CreateAgencyModal";
import CreateAdminModal from "../../shared/components/AdminDashboardComps/CreateAdminModal";
import { toast } from "react-hot-toast";
import { Agency } from "../../shared/models/Agency.model";

export default function AdminDashboard() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
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

  const fetchAdmins = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllAdmins();
      setAdmins(response || []);
    } catch (err) {
      console.error("Error fetching admins:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  const handleCreateAgency = async () => {
    try {
      await fetchAgencies();
      toast.success("Agenzia creata con successo!");
      setIsCreateAgencyModalOpen(false);
    } catch (err) {
      console.error("Errore nel ricaricamento delle agenzie:", err);
    }
  };
  const handleCreateAdmin = async () => {
    try {
      await fetchAdmins();
      toast.success("Admin creato con successo!");
      setIsCreateAdminModalOpen(false);
    } catch (err) {
      console.error("Errore nel ricaricamento degli admin:", err);
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
                onClick={() => setIsCreateAgencyModalOpen(true)}
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
