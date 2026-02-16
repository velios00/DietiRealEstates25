import { Box, Chip, Divider, Slider, Typography } from "@mui/material";

type RangeSectionProps = {
  radius: number;
  onChange: (value: number) => void;
};

const SECTION_TITLE_SX = { fontSize: 20, fontWeight: 600 } as const;

export default function RangeSection({ radius, onChange }: RangeSectionProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        sx={{
          ...SECTION_TITLE_SX,
          color: "#2c3e50",
          textAlign: "center",
          mb: 3,
        }}
      >
        Raggio di ricerca
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Chip
          label={`${radius} km`}
          variant="outlined"
          sx={{ borderColor: "#62A1BA", color: "#000000" }}
        />
      </Box>

      <Slider
        value={radius}
        onChange={(_, value) => onChange(value as number)}
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
  );
}
