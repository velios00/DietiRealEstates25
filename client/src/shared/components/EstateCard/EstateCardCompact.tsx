import {
  Card,
  Box,
  CardMedia,
  Chip,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";

import { LocationOn, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Listing {
  id: number;
  title: string;
  address: string;
  price: number;
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
      sx={{
        width: "100%",
        maxWidth: 400,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
      onClick={() => navigate(`/estate/${listing.id}`)}
    >
      {/* Immagine in alto */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "4 / 3",
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

      {/* Contenuto semplificato */}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 0.6,
          pb: "6px !important",
          gap: 0,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: "0.95rem",
            color: "#2c3e50",
            lineHeight: 1,
          }}
        >
          {listing.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#7f8c8d",
            minHeight: "14px",
          }}
        >
          <LocationOn sx={{ fontSize: 13, mr: 0.3, flexShrink: 0 }} />
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.8rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {listing.address}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "#62A1BA",
            fontWeight: 700,
            fontSize: "1.3rem",
            textAlign: "center",
            mt: 0,
          }}
        >
          € {listing.price.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
