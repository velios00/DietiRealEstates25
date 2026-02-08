import { Box, Chip, Divider, Slider, Typography } from "@mui/material";

type PriceRangeSectionProps = {
  minPrice: number;
  maxPrice: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
};

const SECTION_TITLE_SX = { fontSize: 20, fontWeight: 600 } as const;

export default function PriceRangeSection({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
}: PriceRangeSectionProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography sx={{ ...SECTION_TITLE_SX, mb: 2, textAlign: "center" }}>
        Fascia di prezzo
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Chip
          label={`€ ${minPrice.toLocaleString("it-IT")}`}
          variant="outlined"
          sx={{ borderColor: "#62A1BA", color: "#000000" }}
        />
        <Chip
          label={`€ ${maxPrice.toLocaleString("it-IT")}`}
          variant="outlined"
          sx={{ borderColor: "#62A1BA", color: "#000000" }}
        />
      </Box>

      <Slider
        value={[minPrice, maxPrice]}
        onChange={(_, newValue) => {
          const [min, max] = newValue as number[];
          onMinChange(min);
          onMaxChange(max);
        }}
        min={0}
        max={5000000}
        step={1000}
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
