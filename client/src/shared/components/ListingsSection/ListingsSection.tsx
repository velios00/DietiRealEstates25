import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import EstateCard, { Listing } from "../EstateCard/EstateCard";

export default function ListingsSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);
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

  const MOCK_LISTINGS: Listing[] = [
    {
      id: 1,
      title: "Appartamento, Napoli",
      address: "Via dei cazzi 32",
      price: 120000,
      beds: 2,
      baths: 2,
      area: 85,
      image: "src/assets/hero2.jpg",
      type: "Appartamento",
    },
    {
      id: 2,
      title: "Villa con giardino, Roma",
      address: "Via Roma 45",
      price: 350000,
      beds: 4,
      baths: 3,
      area: 180,
      image: "src/assets/hero2.jpg",
      type: "Villa",
    },
    {
      id: 3,
      title: "Loft moderno, Milano",
      address: "Via Milano 12",
      price: 280000,
      beds: 3,
      baths: 2,
      area: 120,
      image: "src/assets/hero2.jpg",
      type: "Loft",
    },
    {
      id: 4,
      title: "Appartamento vista mare, Sorrento",
      address: "Via del Mare 8",
      price: 220000,
      beds: 3,
      baths: 2,
      area: 95,
      image: "src/assets/hero2.jpg",
      type: "Appartamento",
    },
    {
      id: 5,
      title: "Cascina ristrutturata, Toscana",
      address: "Strada dei Campi 22",
      price: 450000,
      beds: 5,
      baths: 4,
      area: 250,
      image: "src/assets/hero2.jpg",
      type: "Casa indipendente",
    },
  ];

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
            {MOCK_LISTINGS.map((listing) => (
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
