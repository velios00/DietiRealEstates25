import { Box, useMediaQuery, useTheme } from "@mui/material";
import Header from "../../shared/components/Header/Header";
import SearchResults from "../../shared/components/SearchResults/SearchResults";
import RightSidebar from "../../shared/components/RightSideBar.tsx/RightSideBar";
import { EstateFilters } from "../../shared/models/EstateFilters";
import { useCallback, useEffect, useState } from "react";
import { searchEstates } from "../../services/EstateService";
import { Listing } from "../../shared/components/EstateCard/EstateCard";
import { Estate } from "../../shared/models/Estate.model";
import { mapEstateToListing } from "../../mappers/EstateToListing.mapper";

export default function SearchEstate() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [filters, setFilters] = useState<EstateFilters>({});
  const [listings, setListings] = useState<Listing[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchEstates = useCallback(async () => {
    console.log("🔍 Fetching estates with filters:", filters); // Dovrebbe mostrare city + altri filtri
    setLoading(true);
    try {
      const response = await searchEstates({
        filters: {
          ...filters,
        },
        page: currentPage,
        limit: 10,
        orderBy: "createdAt",
      });
      console.log("Response from searchEstates:", response);
      const estates: Estate[] = response.data.results;
      const mapped = estates.map(mapEstateToListing);

      setListings(mapped);
      setTotalResults(response.data.totalResults || estates.length);
    } catch (error) {
      console.error("Errore durante il recupero degli immobili:", error);
      setListings([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage]);

  useEffect(() => {
    fetchEstates();
  }, [fetchEstates]);

  const handleFiltersChange = (newFilters: EstateFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Resetta alla prima pagina quando i filtri cambiano
  };

  return (
    <>
      <Box sx={{ height: "64px" }} /> {/* Spacer per l'header fisso */}
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: "calc(100vh - 64px)",
          backgroundColor: "#f8f9fa",
        }}
      >
        {/* Colonna sinistra: Risultati della ricerca (ancora più ridotta) */}
        <Box
          sx={{
            flex: { xs: 1, md: 0.6 },
            overflowY: "auto",
            maxHeight: { md: "calc(100vh - 64px)" },
            pt: 2,
          }}
        >
          <SearchResults
            listings={listings}
            totalResults={totalResults}
            loading={loading}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </Box>

        {/* Colonna destra: Sidebar con searchbar/filtri + mappa (più ampia) */}
        <Box
          sx={{
            flex: { xs: 1, md: 1.4 },
            minWidth: { md: "640px" },
            borderLeft: { md: "1px solid #e0e0e0" },
            display: { xs: isMobile ? "block" : "none", md: "block" },
          }}
        >
          <RightSidebar
            onFiltersChange={handleFiltersChange}
            filters={filters}
          />
        </Box>
      </Box>
    </>
  );
}
