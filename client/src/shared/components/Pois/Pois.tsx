import { Box, Typography, Chip } from "@mui/material";
import { Poi } from "../../models/Poi.model";

// Mapping delle categorie Geoapify a label leggibili
const POI_MAPPING: { [key: string]: string } = {
  "education.school": "Scuola",
  "public_transport.bus": "Fermata autobus",
  "leisure.park": "Parco",
};

function extractPoiCategories(pois: Poi[] | undefined): string[] {
  if (!pois || !Array.isArray(pois)) return [];

  const categories = new Set<string>();

  pois.forEach((poi) => {
    const poiCategories = poi.properties?.categories || [];
    if (poiCategories && Array.isArray(poiCategories)) {
      poiCategories.forEach((category: string) => {
        const label = POI_MAPPING[category];
        if (label) {
          categories.add(label);
        }
      });
    }
  });

  return Array.from(categories).slice(0, 3); // Mostra max 5 POI
}

interface PoisProps {
  pois?: Poi[];
}

export default function Pois({ pois }: PoisProps) {
  const poiCategories = extractPoiCategories(pois);

  if (poiCategories.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}
    >
      <Typography
        variant="body2"
        sx={{
          color: "#62A1BA",
          fontWeight: 800,
          fontSize: "1rem",
          whiteSpace: "nowrap",
        }}
      >
        Vicino a:
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {poiCategories.map((poi, idx) => (
          <Chip
            key={idx}
            label={poi}
            size="small"
            variant="outlined"
            sx={{
              borderColor: "#62A1BA",
              color: "#62A1BA",
              fontWeight: 600,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
