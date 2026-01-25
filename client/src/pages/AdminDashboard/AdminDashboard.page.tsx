// src/pages/admin/AdminDashboard.tsx - Add these changes

import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Snackbar,
  Alert,
  Card,
  CardContent,
  LinearProgress,
  // Add these imports
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  Add as AddIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  Home as HomeIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  createAgency,
  getAllAgencies,
  deleteAgency,
} from "../../services/AgencyService";
import { createAdmin } from "../../services/UserService";
import Header from "../../shared/components/Header/Header";
import { AgencyResponseDTO } from "../../types/agency/agency.types";
import { CreateAdminDTO } from "../../types/user/user.types";
import AgencyTable from "../../shared/components/admin/AgencyTable/AgencyTable";
import CreateAgencyModal from "../../shared/components/admin/CreateAgencyModal";
import CreateAdminModal from "../../shared/components/admin/CreateAdminModal";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  // State management
  const [agencies, setAgencies] = useState<AgencyResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAgency, setSelectedAgency] =
    useState<AgencyResponseDTO | null>(null);

  // Add state for Create Admin modal
  const [isCreateAdminModalOpen, setIsCreateAdminModalOpen] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);

  // Stats
  const [stats, setStats] = useState({
    totalAgencies: 0,
    activeManagers: 0,
    totalProperties: 0,
  });

  useEffect(() => {
    fetchAgencies();
  }, []);

  const fetchAgencies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllAgencies();
      setAgencies(data);
      updateStats(data);
    } catch (err: any) {
      setError(err.message || "Errore nel caricamento delle agenzie");
      console.error("Error fetching agencies:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStats = (agencyData: AgencyResponseDTO[]) => {
    setStats({
      totalAgencies: agencyData.length,
      activeManagers: agencyData.filter((a) => a.manager).length,
      totalProperties: 0,
    });
  };

  const handleCreateAgency = async (agencyData: any) => {
    try {
      const response = await createAgency(agencyData);

      await fetchAgencies();
      setSuccess(`Agenzia ${response.agency.agencyName} creata con successo!`);

      updateStats([...agencies, response.agency]);
      setIsCreateModalOpen(false);
    } catch (err: any) {
      setError(err.message || "Errore nella creazione dell'agenzia");
    }
  };

  {
    /*
  const handleEditAgency = async (idAgency: string, updateData: any) => {
    try {
      const updatedAgency = await AgencyService.updateAgency(
        idAgency,
        updateData,
      );
      setAgencies((prev) =>
        prev.map((agency) =>
          agency.idAgency === idAgency ? updatedAgency : agency,
        ),
      );
      setSuccess("Agenzia aggiornata con successo!");
      setIsEditModalOpen(false);
      setSelectedAgency(null);
    } catch (err: any) {
      setError(err.message || "Errore nell'aggiornamento dell'agenzia");
    }
  };
  */
  }

  const handleDeleteAgency = async (idAgency: string, agencyName: string) => {
    if (
      !window.confirm(
        `Sei sicuro di voler eliminare l'agenzia "${agencyName}"?`,
      )
    ) {
      return;
    }

    try {
      await deleteAgency(idAgency);
      setAgencies((prev) =>
        prev.filter((agency) => agency.idAgency !== idAgency),
      );
      setSuccess("Agenzia eliminata con successo!");
      updateStats(agencies.filter((agency) => agency.idAgency !== idAgency));
    } catch (err: any) {
      setError(err.message || "Errore nell'eliminazione dell'agenzia");
    }
  };

  const openEditModal = (agency: AgencyResponseDTO) => {
    setSelectedAgency(agency);
    setIsEditModalOpen(true);
  };

  const handleCreateAdmin = async (adminData: CreateAdminDTO) => {
    console.log("handleCreateAdmin RICEVE:", adminData);
    console.log("Email:", adminData.email);
    console.log("Name:", adminData.name, "Type:", typeof adminData.name);
    console.log(
      "Surname:",
      adminData.surname,
      "Type:",
      typeof adminData.surname,
    );
    // Rimuovi il vecchio controllo su adminFormData e usa adminData
    if (!adminData.email || !adminData.name || !adminData.surname) {
      setError("Per favore, compila tutti i campi obbligatori");
      return;
    }

    setAdminLoading(true);
    setError(null);

    try {
      // Usa direttamente adminData passato dalla modale
      const response = await createAdmin(adminData);

      setSuccess(
        `Amministratore "${adminData.name} ${adminData.surname}" creato!`,
      );
      setIsCreateAdminModalOpen(false);

      // I dati della password sono in response.data (non in response.data.data)
      console.log("Password temporanea:", response.data.temporaryPassword);
    } catch (err: any) {
      setError(err.message || "Errore nella creazione dell'amministratore");
    } finally {
      setAdminLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Box>
          <Icon sx={{ fontSize: 48, color }} />
        </Box>
      </CardContent>
    </Card>
  );

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
                Pannello di Amministrazione
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

        {/* Statistics Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
            mb: 4,
          }}
        ></Box>

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

          <AgencyTable
            agencies={agencies}
            loading={loading}
            onDelete={handleDeleteAgency}
            onEdit={openEditModal}
          />
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

      {/* Edit Agency Modal - might be implemented in the future */}
      {/*
    {selectedAgency && (
      <EditAgencyModal
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedAgency(null);
        }}
        onSubmit={handleEditAgency}
        agency={selectedAgency}
      />
    )}
    */}

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSuccess(null)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminDashboard;
