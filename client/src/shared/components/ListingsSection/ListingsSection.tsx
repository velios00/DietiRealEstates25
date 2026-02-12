import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import EstateCard, { Listing } from "../EstateCard/EstateCard";
import { searchEstates } from "../../../services/EstateService";
import { mapEstateToListing } from "../../../mappers/EstateToListing.mapper";
import { Estate } from "../../models/Estate.model";

export default function ListingsSection() {
  const [listings, setListings] = useState<Listing[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    searchEstates({
      page: 1,
      limit: 8,
      orderBy: "createdAt",
    })
      .then((response) => {
        const estates: Estate[] = response.data.results;
        const mapped = estates.map(mapEstateToListing);
        setListings(mapped);
      })
      .catch((error) => {
        console.error("Errore durante il recupero degli annunci:", error);
      });
  }, []);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      sx={{
        py: 6,
        px: { xs: 2, md: 4, lg: 8 },
        backgroundColor: "#f8f9fa",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Container principale con bordo celeste */}
      <Box
        sx={{
          py: 2,
          width: "100%",

          border: "1px solid #62A1BA",
          borderRadius: 12,
          backgroundColor: "white",
          overflow: "hidden",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        {/* Titolo sezione */}
        <Box sx={{ mb: 4, pt: 2 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: "2.5rem",
              textAlign: "center",
              color: "#62A1BA",
            }}
          >
            Nuovi Annunci
          </Typography>
        </Box>
        <Box sx={{ position: "relative", pb: 4 }}>
          {/* Freccia sinistra */}
          <IconButton
            onClick={scrollLeft}
            sx={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(4px)",
              boxShadow: 2,
              zIndex: 10,
              "&:hover": {
                backgroundColor: "rgba(98, 161, 186, 0.1)",
                border: "1px solid rgba(98, 161, 186, 0.6)",
              },
              display: { xs: "none", md: "flex" },
            }}
          >
            <ChevronLeft fontSize="large" />
          </IconButton>
          {/* Container annunci */}
          <Box
            ref={containerRef}
            sx={{
              display: "flex",
              gap: 3,
              overflowX: "auto",
              overflowY: "hidden",
              scrollbarWidth: "none", // Firefox
              "&::-webkit-scrollbar": {
                display: "none", // Chrome, Safari, Edge
              },
              py: 2,
              px: { xs: 2, md: 4 },
              scrollSnapType: "x mandatory",
              "& > *": {
                scrollSnapAlign: "center",
              },
              "& > div:first-of-type": {
                ml: { xs: 0, md: 6 },
              },
              "& > div:last-of-type": {
                mr: { xs: 0, md: 6 },
              },
            }}
          >
            {listings.map((listing) => (
              <Box
                key={listing.id}
                sx={{
                  flexShrink: 0,
                }}
              >
                <EstateCard listing={listing} />
              </Box>
            ))}
          </Box>
          <IconButton
            onClick={scrollRight}
            sx={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(4px)",
              boxShadow: 2,
              zIndex: 10,
              "&:hover": {
                backgroundColor: "rgba(98, 161, 186, 0.1)",
                border: "1px solid rgba(98, 161, 186, 0.6)",
              },
              display: { xs: "none", md: "flex" },
            }}
          >
            <ChevronRight fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
