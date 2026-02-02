import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";

type EnergyClassSectionProps = {
  value: string;
  onChange: (value: string) => void;
};

const SECTION_TITLE_SX = { fontSize: 20, fontWeight: 600 } as const;
const energyClasses = ["a+", "a", "b", "c", "d", "e", "f", "g"];

export default function EnergyClassSection({
  value,
  onChange,
}: EnergyClassSectionProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <HomeIcon sx={{ color: "#62A1BA" }} />
          <Typography sx={SECTION_TITLE_SX}>Classe Energetica</Typography>
        </Box>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <Select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            displayEmpty
            IconComponent={ExpandMoreIcon}
            sx={{
              borderRadius: 20,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc",
              },
            }}
          >
            <MenuItem value="">Seleziona...</MenuItem>
            {energyClasses.map((energyClass) => (
              <MenuItem key={energyClass} value={energyClass}>
                {energyClass.charAt(0).toUpperCase() + energyClass.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
