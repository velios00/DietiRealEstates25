import { Box, Typography, TextField } from "@mui/material";

type YourOfferSectionProps = {
  offerPrice: string;
  estatePrice: number;
  onOfferPriceChange: (value: string) => void;
};

export default function YourOfferSection({
  offerPrice,
  estatePrice,
  onOfferPriceChange,
}: YourOfferSectionProps) {
  const parsedOfferPrice = parseFloat(offerPrice);
  const isOfferValid =
    offerPrice &&
    !isNaN(parsedOfferPrice) &&
    parsedOfferPrice > 0 &&
    parsedOfferPrice <= estatePrice;

  return (
    <>
      {/* Sezione offerta */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: "#62A1BA",
            mb: 2,
            textAlign: "center",
          }}
        >
          La tua Offerta
        </Typography>

        <TextField
          fullWidth
          type="number"
          value={offerPrice}
          onChange={(e) => onOfferPriceChange(e.target.value)}
          placeholder="Inserisci il tuo prezzo"
          slotProps={{
            input: {
              inputProps: {
                step: "1000",
                min: "0",
              },
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              fontSize: "1.6rem",
              fontWeight: 600,
              textAlign: "center",
              "& input": {
                textAlign: "center",
              },
              "&:hover fieldset": {
                borderColor: "#4a90a4",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#4a90a4",
              },
            },
          }}
        />
      </Box>

      {/* Messaggio informativo con validazione visiva */}
      {offerPrice && !isNaN(parsedOfferPrice) && (
        <Typography
          variant="caption"
          sx={{
            color: isOfferValid ? "#4caf50" : "#f44336",
            display: "block",
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          {parsedOfferPrice <= 0
            ? "L'offerta deve essere maggiore di 0"
            : parsedOfferPrice > estatePrice
              ? "L'offerta deve essere inferiore al prezzo di partenza"
              : "Offerta valida"}
        </Typography>
      )}
    </>
  );
}
