import { Box, Typography } from "@mui/material";

type EstatePriceSectionProps = {
  estatePrice: number;
};

export default function EstatePriceSection({
  estatePrice,
}: EstatePriceSectionProps) {
  return (
    <Box
      sx={{
        mb: 3,
        p: 2,
        bgcolor: "#f9f9f9",
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
        Prezzo Immobile
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: "#62A1BA",
        }}
      >
        {estatePrice.toLocaleString("it-IT")} €
      </Typography>
    </Box>
  );
}
