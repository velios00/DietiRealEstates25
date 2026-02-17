import { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";
import { Estate } from "../../shared/models/Estate.model";
import { searchEstates } from "../../services/EstateService";
import { getAgencyById } from "../../services/AgencyService";
import { createAgent } from "../../services/AgentService";
import AgencyCard from "../../shared/components/AgencyCard/AgencyCard";
import EstateCard from "../../shared/components/EstateCard/EstateCard";
import CreateAgentModal from "../../shared/components/CreateAgentModal/CreateAgentModal";
import { useParams } from "react-router-dom";
import { Agency } from "../../shared/models/Agency.model";
import { CreateAgent } from "../../shared/models/Agent.model";
import { mapEstateToListing } from "../../mappers/EstateToListing.mapper";
import CreateEstateModal from "../../shared/components/CreateEstateModal/CreateEstateModal";
import { toast } from "react-hot-toast";
import { useAgencyAccess } from "../../shared/hooks/useAgencyAccess";

export default function AgencyView() {
  const { id } = useParams<{ id: string }>();
  const {
    canManageAgency,
    canManageAgentsInAgency,
    loading: agencyAccessLoading,
  } = useAgencyAccess();

  const [estates, setEstates] = useState<Estate[]>([]);
  const [agency, setAgency] = useState<Agency | null>(null);
  const [loading, setLoading] = useState(true);
  const [estatesLoading, setEstatesLoading] = useState(false);
  const [agencyLoading, setAgencyLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [isCreateAgentModalOpen, setIsCreateAgentModalOpen] = useState(false);

  // Verifica permessi per questa specifica agenzia
  const canManageEstates = canManageAgency(Number(id));
  const canManageAgents = canManageAgentsInAgency(Number(id));

  const fetchAgencyData = async () => {
    if (!id) return;
    setAgencyLoading(true);
    try {
      const data = await getAgencyById(id);
      setAgency(data);
    } finally {
      setAgencyLoading(false);
    }
  };

  const fetchEstates = async () => {
    if (!id) return;
    setEstatesLoading(true);
    try {
      const response = await searchEstates({
        filters: {
          idAgency: parseInt(id),
        },
        page: currentPage,
        limit: 10,
        orderBy: "createdAt",
      });
      setEstates(response.data?.results || response.data || []);
    } catch (err) {
      setEstates([]);
    } finally {
      setEstatesLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const results = await Promise.allSettled([
          fetchAgencyData(),
          fetchEstates(),
        ]);
        const hasError = results.some((result) => result.status === "rejected");
        if (hasError) {
          const firstError = results.find(
            (result) => result.status === "rejected",
          );
        }
      } catch (err) {
        console.log("Errore nel caricamento dei dati della pagina:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, currentPage]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleEstateCreated = () => {
    fetchEstates();
    toast.success("Immobile creato con successo!");
  };

  const handleCreateAgent = async (agentData: CreateAgent) => {
    try {
      await createAgent(agentData);
      toast.success("Agente creato con successo!");
      setIsCreateAgentModalOpen(false);
      // Optionally refresh agency data to show the new agent
      await fetchAgencyData();
    } catch (err: any) {
      console.error("Errore nella creazione dell'agente:", err);

      // Handle specific errors
      if (err.response?.status === 400) {
        toast.error("Email già registrata");
      } else if (err.response?.status === 401) {
        toast.error("Non autorizzato");
      } else {
        toast.error("Errore durante la creazione dell'agente");
      }
      throw err; // Re-throw to let the modal handle it
    }
  };

  const isLoading =
    loading || agencyLoading || estatesLoading || agencyAccessLoading;

  if (isLoading && !agency && estates.length === 0) {
    return (
      <Box sx={{ minHeight: "100vh", backgroundColor: "#f0f0f0", py: 4 }}>
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
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f0f0f0", py: 4 }}>
      <Box sx={{ mb: 12 }}></Box>

      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{ borderRadius: 4, overflow: "hidden", backgroundColor: "white" }}
        >
          {/* SEZIONE SUPERIORE: Info Agenzia */}
          {agency && (
            <Box sx={{ p: 4, borderBottom: "1px solid #eee" }}>
              <AgencyCard
                name={agency.agencyName || "Unnamed Agency"}
                logo={agency.profileImage || "https://via.placeholder.com/150"}
                description={agency.description || "No description available"}
                manager={
                  agency.manager
                    ? `${agency.manager.name} ${agency.manager.surname}`
                    : "Unknown Manager"
                }
                idAgency={Number(id) || 0}
                onAddEstate={canManageEstates ? handleOpenModal : undefined}
                onAddAgent={
                  canManageAgents
                    ? () => setIsCreateAgentModalOpen(true)
                    : undefined
                }
              />
            </Box>
          )}

          {/* SEZIONE INFERIORE: Proprietà */}
          <Box sx={{ p: 4, position: "relative", minHeight: "200px" }}>
            {estatesLoading && (
              <Box>
                <CircularProgress sx={{ color: "#62A1BA" }} />
              </Box>
            )}

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: { xs: 3, md: 4 },
                color: "#2c3e50",
                fontSize: { xs: "1.25rem", sm: "1.4rem", md: "1.5rem" },
                lineHeight: { xs: 1.25, sm: 1.3, md: 1.35 },
              }}
            >
              Le nostre proprietà ({estates.length})
            </Typography>

            {estates.length === 0 && !estatesLoading ? (
              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
                py={4}
              >
                Nessun immobile disponibile per questa agenzia.
              </Typography>
            ) : (
              <Grid container spacing={4} justifyContent="center">
                {estates.map((estate) => (
                  <Grid
                    key={estate.idEstate}
                    size={{ xs: 12, sm: 6, md: 6 }}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <EstateCard listing={mapEstateToListing(estate)} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Paper>
      </Container>

      {/* Create Estate Modal */}
      <CreateEstateModal
        open={modalOpen}
        onClose={handleCloseModal}
        idAgency={Number(id) || 0}
        onEstateCreated={handleEstateCreated}
      />

      {/* Create Agent Modal - mostra solo se può gestire agenti in questa agenzia */}
      {canManageAgents && (
        <CreateAgentModal
          open={isCreateAgentModalOpen}
          onClose={() => setIsCreateAgentModalOpen(false)}
          onSubmit={handleCreateAgent}
        />
      )}
    </Box>
  );
}
