import { Box, useMediaQuery, useTheme } from "@mui/material";
import SearchResults from "../../shared/components/SearchEstatesComps/SearchResults/SearchResults";
import RightSidebar from "../../shared/components/SearchEstatesComps/RightSideBar.tsx/RightSideBar";
import { EstateFilters } from "../../shared/models/EstateFilters.model";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchEstates } from "../../services/EstateService";
import { Listing } from "../../shared/components/EstateCard/EstateCard";
import { Estate } from "../../shared/models/Estate.model";
import { mapEstateToListing } from "../../mappers/EstateToListing.mapper";

export default function SearchEstate() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchParams] = useSearchParams();

  const getFiltersFromParams = (): EstateFilters => {
    const city = searchParams.get("city") ?? undefined;
    const latParam = searchParams.get("lat");
    const lonParam = searchParams.get("lon");
    const radiusParam = searchParams.get("radius");

    const lat = latParam ? parseFloat(latParam) : undefined;
    const lon = lonParam ? parseFloat(lonParam) : undefined;
    const radius = radiusParam ? parseFloat(radiusParam) : undefined;

    if (
      lat !== undefined &&
      lon !== undefined &&
      !Number.isNaN(lat) &&
      !Number.isNaN(lon)
    ) {
      return {
        city,
        lat,
        lon,
        radius: radius && !Number.isNaN(radius) ? radius : 5,
      };
    }

    return city ? { city } : {};
  };

  const [filters, setFilters] = useState<EstateFilters>(() =>
    getFiltersFromParams(),
  );
  const [estates, setEstates] = useState<Estate[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Inizializza i filtri quando la pagina viene raggiunta
  useEffect(() => {
    const nextFilters = getFiltersFromParams();
    setFilters(nextFilters);
    setCurrentPage(1);
  }, [searchParams]);

  const fetchEstates = useCallback(async () => {
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
      const estatesData: Estate[] = response.data.results;
      const mapped = estatesData.map(mapEstateToListing);

      setEstates(estatesData);
      setListings(mapped);
      setTotalResults(response.data.totalResults || estatesData.length);
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
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: "calc(100vh - 64px)",
          backgroundColor: "#f8f9fa",
        }}
      >
        {/* Colonna sinistra: Risultati della ricerca */}
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

        {/* Colonna destra: Sidebar con searchbar/filtri + mappa */}
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
            estates={estates}
            isLoading={loading}
          />
        </Box>
      </Box>
    </>
  );
}
