import {
  Card,
  Box,
  CardMedia,
  Chip,
  CardContent,
  Typography,
  IconButton,
  Divider,
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
}

interface ListingCardProps {
  listing: Listing;
}

export default function EstateCardCompact({ listing }: ListingCardProps) {
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

  return (
    <Card
      onClick={() => navigate(`/estate/${listing.id}`)}
      sx={{
        width: "100%",
        maxWidth: 520,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "none",
        display: "flex",
        cursor: "pointer",
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
            top: 8,
            right: 8,
            backgroundColor: "rgba(255,255,255,0.95)",
            fontWeight: 600,
            fontSize: "0.7rem",
          }}
        />
        {/* Frecce di navigazione */}
        {hasMultiplePhotos && isHovered && (
          <>
            <IconButton
              onClick={handlePrevious}
              size="small"
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
              size="small"
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

      {/* Contenuto semplificato */}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 1,
          gap: 0.3,
        }}
      >
        <Typography
          variant="h6"
          textAlign="center"
          sx={{
            fontWeight: 700,
            fontSize: "1.2rem",
            color: "#2c3e50",
            lineHeight: 1.2,
          }}
        >
          {listing.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#7f8c8d",
            minHeight: "16px",
            width: "100%",
          }}
        >
          <LocationOn sx={{ fontSize: 15, mr: 0.3, flexShrink: 0, mt: -0.2 }} />
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.8rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              lineHeight: 1.2,
              textAlign: "center",
            }}
          >
            {listing.address}
          </Typography>
        </Box>

        <Divider sx={{ opacity: 0.4 }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#7f8c8d",
            gap: 0.8,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
            <MeetingRoom sx={{ fontSize: 18, color: "#62A1BA" }} />
            <Typography variant="body2" sx={{ fontSize: "0.7rem" }}>
              {listing.rooms} stanze
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
            <Bathroom sx={{ fontSize: 18, color: "#62A1BA" }} />
            <Typography variant="body2" sx={{ fontSize: "0.7rem" }}>
              {listing.baths} bagni
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
            <SquareFoot sx={{ fontSize: 18, color: "#62A1BA" }} />
            <Typography variant="body2" sx={{ fontSize: "0.7rem" }}>
              {listing.size} m²
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ opacity: 0.4 }} />

        <Typography
          variant="body2"
          sx={{
            color: "#62A1BA",
            fontWeight: 1000,
            fontSize: "1.25rem",
            textAlign: "center",
            mt: 0.1,
          }}
        >
          € {listing.price.toLocaleString()}
          {isRent && (
            <span style={{ fontSize: "0.75rem", marginLeft: "4px" }}>
              /mese
            </span>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
}
