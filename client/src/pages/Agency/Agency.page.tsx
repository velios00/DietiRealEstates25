import { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";
import { Estate } from "../../shared/models/Estate.model";
import Header from "../../shared/components/Header/Header";
import { searchEstates } from "../../services/EstateService";
import { getAgencyById } from "../../services/AgencyService";
import AgencyCard from "../../shared/components/AgencyCard/AgencyCard";
import EstateCard from "../../shared/components/EstateCard/EstateCard";
import { useParams } from "react-router-dom";
import { AgencyResponse } from "../../shared/models/Agency.model";
import { mapEstateToListing } from "../../mappers/EstateToListing.mapper";

export default function Agency() {
  const { id } = useParams<{ id: string }>();
  const [estates, setEstates] = useState<Estate[]>([]);
  const [agency, setAgency] = useState<AgencyResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [estatesLoading, setEstatesLoading] = useState(false);
  const [agencyLoading, setAgencyLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchAgencyData = async () => {
    if (!id) return;
    setAgencyLoading(true);
    try {
      const data = await getAgencyById(id);
      setAgency(data);
    } catch (err) {
      setError("Errore nel caricamento dei dati dell'agenzia");
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
    } catch (err: any) {
      setError(err.message || "Failed to load estates");
      setEstates([]);
    } finally {
      setEstatesLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        await Promise.all([fetchAgencyData(), fetchEstates()]);
      } catch (err: any) {
        setError(err.message || "Failed to load page data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const isLoading = loading || agencyLoading || estatesLoading;

  if (isLoading && !agency && estates.length === 0) {
    return (
      <Box sx={{ minHeight: "100vh", backgroundColor: "#d4d2d2", py: 4 }}>
        <Box sx={{ mb: 12 }}>
          <Header />
        </Box>
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
      <Box sx={{ mb: 12 }}>
        <Header />
      </Box>

      <Container maxWidth="lg">
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

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
                  agency.managerName ||
                  agency.manager?.name ||
                  "Unknown Manager"
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
              sx={{ fontWeight: 700, mb: 4, color: "#2c3e50" }}
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
              <Grid container spacing={4}>
                {estates.map((estate) => (
                  <Grid key={estate.idEstate} size={{ xs: 12, sm: 6, md: 6 }}>
                    <EstateCard listing={mapEstateToListing(estate)} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
