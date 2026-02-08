import {
  Card,
  Box,
  CardMedia,
  Chip,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";

import {
  LocationOn,
  MeetingRoom,
  Bathroom,
  SquareFoot,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Interfaccia estesa per supportare sia listing semplici che con dati offerta
export interface Listing {
  id: number;
  title: string;
  address: string;
  price: number;
  rooms: number;
  baths: number;
  size: number;
  photos: string[];
  type: string;
  offerAmount?: number;
  offerStatus?: "pending" | "accepted" | "rejected" | "countered";
  counterOfferAmount?: number;
}

interface ListingCardProps {
  listing: Listing;
}

export default function EstateCard({ listing }: ListingCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const isRent = listing.type?.toLowerCase() === "affitto";

  const hasMultiplePhotos = listing.photos && listing.photos.length > 1;

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? listing.photos.length - 1 : prev - 1,
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === listing.photos.length - 1 ? 0 : prev + 1,
    );
  };

  // Funzione helper per ottenere colore e label dello stato dell'offerta
  const getOfferStatusConfig = (status: string) => {
    const configs = {
      pending: { color: "#FFA726", label: "In Attesa" },
      accepted: { color: "#66BB6A", label: "Accettata" },
      rejected: { color: "#EF5350", label: "Rifiutata" },
      countered: { color: "#42A5F5", label: "Controproposta" },
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  const statusConfig = listing.offerStatus
    ? getOfferStatusConfig(listing.offerStatus)
    : null;

  return (
    <Card
      onClick={() => navigate(`/estate/${listing.id}`)}
      sx={{
        width: 480,
        borderRadius: 6,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          cursor: "pointer",
          transform: "translateY(-5px)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
        },
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Immagine in alto */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          overflow: "hidden",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardMedia
          component="img"
          image={listing.photos?.[currentImageIndex] || ""}
          alt="Estate"
          sx={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            transition: "opacity 0.3s ease",
          }}
        />
        <Chip
          label={listing.type}
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
        {/* Badge stato offerta - mostrato solo se presente */}
        {statusConfig && (
          <Chip
            label={statusConfig.label}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              backgroundColor: statusConfig.color,
              color: "white",
              fontWeight: 600,
              fontSize: "0.75rem",
            }}
          />
        )}
        {/* Frecce di navigazione */}
        {hasMultiplePhotos && isHovered && (
          <>
            <IconButton
              onClick={handlePrevious}
              sx={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(255,255,255,0.9)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,1)",
                },
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              <ChevronLeft />
            </IconButton>

            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(255,255,255,0.9)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,1)",
                },
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              <ChevronRight />
            </IconButton>
          </>
        )}
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
            {listing.title}
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
              {listing.address}
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
            € {listing.price.toLocaleString()}
            {isRent && (
              <span style={{ fontSize: "0.85rem", marginLeft: "4px" }}>
                /mese
              </span>
            )}
          </Typography>

          {/* Mostra dettagli offerta se presente */}
          {listing.offerAmount && (
            <Box sx={{ mt: 1, pt: 1, borderTop: "1px solid #eee" }}>
              <Typography
                variant="body2"
                sx={{ color: "#7f8c8d", fontSize: "0.85rem" }}
              >
                La tua offerta:{" "}
                <strong style={{ color: "#2c3e50" }}>
                  € {listing.offerAmount.toLocaleString()}
                </strong>
              </Typography>
              {listing.counterOfferAmount && (
                <Typography
                  variant="body2"
                  sx={{
                    color: "#42A5F5",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    mt: 0.5,
                  }}
                >
                  Controproposta:{" "}
                  <strong>
                    € {listing.counterOfferAmount.toLocaleString()}
                  </strong>
                </Typography>
              )}
            </Box>
          )}
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
            <MeetingRoom sx={{ color: "#62A1BA", fontSize: 20 }} />
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, fontSize: "0.9rem", color: "#2c3e50" }}
            >
              {listing.rooms} stanze
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Bathroom sx={{ color: "#62A1BA", fontSize: 20 }} />
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, fontSize: "0.9rem", color: "#2c3e50" }}
            >
              {listing.baths} bagni
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SquareFoot sx={{ color: "#62A1BA", fontSize: 20 }} />
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, fontSize: "0.9rem", color: "#2c3e50" }}
            >
              {listing.size} m²
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
