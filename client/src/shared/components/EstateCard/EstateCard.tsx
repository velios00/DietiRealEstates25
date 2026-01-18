import {
  Card,
  Box,
  CardMedia,
  Chip,
  CardContent,
  Typography,
} from "@mui/material";

import { LocationOn, Bed, Bathroom, SquareFoot } from "@mui/icons-material";

export default function EstateCard() {
  return (
    <Card
      sx={{
        width: 400,
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
        },
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Immagine in alto */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image={"/src/assets/hero2.jpg"}
          alt="Estate"
          sx={{
            objectFit: "cover",
            width: "100%",
          }}
        />
        <Chip
          label={"Affitto"}
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor: "rgba(255,255,255,0.95)",
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
        />
      </Box>

      {/* Contenuto diviso in due colonne */}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 2.5,
          gap: 2,
        }}
      >
        {/* Colonna sinistra: Titolo, Prezzo, Indirizzo */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "#2c3e50",
              lineHeight: 1.3,
            }}
          >
            {"Appartamento moderno"}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#7f8c8d",
            }}
          >
            <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
            <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
              {"Via Napoli 33, Italia"}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: "#62A1BA",
              fontWeight: 600,
              fontSize: "1.75rem",
            }}
          >
            € {"250.000"}
          </Typography>
        </Box>

        {/* Colonna destra: Caratteristiche */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 1.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Bed sx={{ color: "#62A1BA", fontSize: 20 }} />
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, fontSize: "0.9rem", color: "#2c3e50" }}
            >
              {"3"} letti
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Bathroom sx={{ color: "#62A1BA", fontSize: 20 }} />
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, fontSize: "0.9rem", color: "#2c3e50" }}
            >
              {"2"} bagni
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SquareFoot sx={{ color: "#62A1BA", fontSize: 20 }} />
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, fontSize: "0.9rem", color: "#2c3e50" }}
            >
              {"120"} m²
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
