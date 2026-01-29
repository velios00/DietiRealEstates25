import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import { SquareFoot, Bed, Bathroom } from "@mui/icons-material";
import { Estate } from "../../models/Estate.model";

interface EstateInfoCardProps {
  estate: Estate;
  onOfferClick?: () => void;
}

export default function EstateInfoCard({
  estate,
  onOfferClick,
}: EstateInfoCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Header azzurro */}
      <Box
        sx={{
          bgcolor: "#62A1BA",
          color: "white",
          p: 2.5,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
          {estate.title}
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.9, fontSize: 16 }}>
          {estate.place.street}, {estate.place.city}, NA
        </Typography>
      </Box>

      <CardContent sx={{ p: 3 }}>
        {/* Dettagli proprietà */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            gap: 2,
            mb: 3,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <SquareFoot
              sx={{
                color: "#62A1BA",
                mb: 1,
                fontSize: "2rem",
              }}
            />
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#333" }}>
              {estate.size} mq
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Bed
              sx={{
                color: "#62A1BA",
                mb: 1,
                fontSize: "2rem",
              }}
            />
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#333" }}>
              {estate.nRooms} locali
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Bathroom
              sx={{
                color: "#62A1BA",
                mb: 1,
                fontSize: "2rem",
              }}
            />
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#333" }}>
              {estate.nBathrooms} bagni
            </Typography>
          </Box>
        </Box>

        {/* Prezzo */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#62A1BA",
              fontSize: "2.5rem",
            }}
          >
            {estate.price.toLocaleString()}$
          </Typography>
        </Box>

        {/* Button Proponi Offerta */}
        <Button
          variant="contained"
          fullWidth
          onClick={onOfferClick}
          sx={{
            bgcolor: "#62A1BA",
            color: "white",
            fontWeight: 600,
            py: 1.5,
            borderRadius: 2,
            mb: 3,
            "&:hover": { bgcolor: "#4a8aa3" },
          }}
        >
          Proponi Offerta
        </Button>

        {/* Info Agenzia */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            pt: 2,
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              bgcolor: "#52A875",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 700,
              fontSize: "1.5rem",
              mb: 1.5,
            }}
          >
            T
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: "#333", mb: 0.5 }}
            >
              Tecnocasa immobiliare
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#666", display: "block" }}
            >
              www.tecnocasa.it
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#666", display: "block" }}
            >
              0814523123
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#333",
                display: "block",
                mt: 1,
                fontWeight: 500,
              }}
            >
              Pancrazio Stimolato
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
