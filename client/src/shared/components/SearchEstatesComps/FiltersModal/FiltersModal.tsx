import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Button,
  Slider,
  Chip,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { EstateFilters } from "../../../models/EstateFilters.model";
import ContractTypeSection from "./FiltersSections/ContractTypeSection";
import PriceRangeSection from "./FiltersSections/PriceRangeSection";
import RoomsBathsSection from "./FiltersSections/RoomsBathsSection";
import SurfaceSection from "./FiltersSections/SurfaceSection";
import FloorSection from "./FiltersSections/FloorSection";
import EnergyClassSection from "./FiltersSections/EnergyClassSection";

type Props = {
  open: boolean;
  onClose: () => void;
  filters: EstateFilters;
  onApply: (filters: EstateFilters) => void;
};

const DEFAULT_FILTERS: Partial<EstateFilters> = {
  type: "affitto",
  minPrice: 0,
  maxPrice: 5000000,
  nRooms: 0,
  nBathrooms: 0,
  minSize: 10,
  maxSize: 1000,
};

export default function FiltersModal({
  open,
  onClose,
  filters,
  onApply,
}: Props) {
  const [localFilters, setLocalFilters] = useState<EstateFilters>({
    ...DEFAULT_FILTERS,
    ...filters,
  });

  useEffect(() => {
    setLocalFilters({ ...DEFAULT_FILTERS, ...filters });
  }, [filters]);

  const handleFilterChange = <K extends keyof EstateFilters>(
    key: K,
    value: EstateFilters[K],
  ) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFiltri = () => {
    setLocalFilters({ ...DEFAULT_FILTERS, city: filters.city });
  };

  const applicaFiltri = () => {
    onApply(localFilters);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          maxHeight: "70vh",
          height: { xs: "auto", sm: "auto" },
          margin: { xs: 0, sm: "auto" },
          maxWidth: { xs: "100%", sm: "500px" },
        },
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          bgcolor: "white",
          borderBottom: "1px solid #eee",
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Typography fontWeight={800}>Filtri</Typography>
        <Box width={40} />
      </Box>

      {/* contenuto scrollabile */}
      <Box sx={{ p: 3, flex: "1 1 auto", overflowY: "auto" }}>
        <ContractTypeSection
          value={localFilters.type || "affitto"}
          onChange={(value) => handleFilterChange("type", value)}
        />

        <PriceRangeSection
          minPrice={localFilters.minPrice || 0}
          maxPrice={localFilters.maxPrice || 5000000}
          onMinChange={(value) => handleFilterChange("minPrice", value)}
          onMaxChange={(value) => handleFilterChange("maxPrice", value)}
        />

        <RoomsBathsSection
          rooms={localFilters.nRooms || 0}
          baths={localFilters.nBathrooms || 0}
          onRoomsChange={(value) => handleFilterChange("nRooms", value)}
          onBathsChange={(value) => handleFilterChange("nBathrooms", value)}
        />

        <SurfaceSection
          minSize={localFilters.minSize || 10}
          maxSize={localFilters.maxSize || 1000}
          onMinChange={(value) => handleFilterChange("minSize", value)}
          onMaxChange={(value) => handleFilterChange("maxSize", value)}
        />

        <FloorSection
          value={localFilters.floor}
          onChange={(value) => handleFilterChange("floor", value)}
        />

        <EnergyClassSection
          value={localFilters.energyClass || ""}
          onChange={(value) =>
            handleFilterChange("energyClass", value || undefined)
          }
        />

        {/* Raggio di ricerca - visibile solo se lat/lon sono impostati */}
        {localFilters.lat !== undefined && localFilters.lon !== undefined && (
          <Box sx={{ mb: 4 }}>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 600,
                color: "#2c3e50",
                textAlign: "center",
                mb: 3,
              }}
            >
              Raggio di ricerca
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Chip
                label={`${localFilters.radius || 5} km`}
                variant="outlined"
                sx={{ borderColor: "#62A1BA", color: "#000000" }}
              />
            </Box>

            <Slider
              value={localFilters.radius || 5}
              onChange={(_, value) =>
                handleFilterChange("radius", value as number)
              }
              min={1}
              max={50}
              step={1}
              sx={{
                color: "#62A1BA",
                "& .MuiSlider-track": {
                  border: "none",
                },
                "& .MuiSlider-thumb": {
                  height: 20,
                  width: 20,
                  backgroundColor: "#fff",
                  border: "2px solid #62A1BA",
                  "&:focus, &:hover, &.Mui-active": {
                    boxShadow: "0 0 0 8px rgba(98, 161, 186, 0.16)",
                  },
                },
              }}
            />

            <Divider sx={{ my: 3 }} />
          </Box>
        )}
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          bgcolor: "white",
          borderTop: "1px solid #e0e0e0",
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Button
          color="inherit"
          onClick={resetFiltri}
          sx={{
            borderRadius: 2,
            px: 3,
            color: "#666",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.04)",
            },
          }}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          onClick={applicaFiltri}
          sx={{
            backgroundColor: "#62A1BA",
            borderRadius: 2,
            px: 4,
            "&:hover": {
              backgroundColor: "#4299b5",
            },
          }}
        >
          Applica filtri
        </Button>
      </Box>
    </Dialog>
  );
}
