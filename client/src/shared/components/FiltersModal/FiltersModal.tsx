import { Dialog, Box, Typography, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { EstateFilters } from "../../models/EstateFilters";
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
  minPrice: 20000,
  maxPrice: 10000000,
  minRooms: 0,
  minBathrooms: 0,
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
          minPrice={localFilters.minPrice || 20000}
          maxPrice={localFilters.maxPrice || 1000000}
          onMinChange={(value) => handleFilterChange("minPrice", value)}
          onMaxChange={(value) => handleFilterChange("maxPrice", value)}
        />

        <RoomsBathsSection
          rooms={localFilters.minRooms || 0}
          baths={localFilters.minBathrooms || 0}
          onRoomsChange={(value) => handleFilterChange("minRooms", value)}
          onBathsChange={(value) => handleFilterChange("minBathrooms", value)}
        />

        <SurfaceSection
          minSize={localFilters.minSize || 10}
          maxSize={localFilters.maxSize || 1000}
          onMinChange={(value) => handleFilterChange("minSize", value)}
          onMaxChange={(value) => handleFilterChange("maxSize", value)}
        />

        <FloorSection
          value={localFilters.floor?.toString() || ""}
          onChange={(value) =>
            handleFilterChange("floor", value ? parseInt(value) : undefined)
          }
        />

        <EnergyClassSection
          value={localFilters.energyClass || ""}
          onChange={(value) =>
            handleFilterChange("energyClass", value || undefined)
          }
        />
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
