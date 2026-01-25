import { Box } from "@mui/material";
import { SearchBar } from "../SearchBar/SearchBar";
import { FiltersButton } from "../FiltersButton/FiltersButton";
import MapView from "../MapView/MapView";
import { EstateFilters } from "../../models/EstateFilters";
import { Estate } from "../../models/Estate.model";

interface RightSideBarProps {
  onFiltersChange: (filters: EstateFilters) => void;
  filters: EstateFilters;
  estates: Estate[];
  isLoading?: boolean;
}

export default function RightSidebar({
  onFiltersChange,
  filters,
  estates,
  isLoading,
}: RightSideBarProps) {
  const handleSearchChange = (searchQuery: string) => {
    onFiltersChange({
      ...filters,
      city: searchQuery.trim() || undefined,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 64px)",
        backgroundColor: "white",
        pt: 2,
      }}
    >
      {/* Sezione superiore: SearchBar e FiltersButton affiancati */}
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid #e0e0e0",
          backgroundColor: "#f8f9fa",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "95%",
            display: "flex",
            gap: 1.5,
            alignItems: "center",
          }}
        >
          <Box sx={{ flex: 1, maxWidth: "calc(100% - 140px)" }}>
            <SearchBar onSearch={handleSearchChange} />
          </Box>
          <Box sx={{ minWidth: "110px", maxWidth: "130px" }}>
            <FiltersButton
              onFiltersChange={onFiltersChange}
              filters={filters}
            />
          </Box>
        </Box>
      </Box>

      {/* Sezione inferiore: Mappa che occupa tutto lo spazio rimanente */}
      <Box
        sx={{
          flex: 1,
          p: 2,
          overflow: "hidden",
        }}
      >
        <MapView
          estates={estates}
          isLoading={isLoading}
          center={
            filters.city ? undefined : [40.8522, 14.2441] // Napoli se nessuna città specificata
          }
        />
      </Box>
    </Box>
  );
}
