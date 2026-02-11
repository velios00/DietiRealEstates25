import { Box, Typography } from "@mui/material";
import { SearchBar } from "../SearchBar/SearchBar";
import { Location } from "../../models/Location.model";

interface HeroProps {
  query: string;
  setQuery: (value: string) => void;
  onSearch: () => void;
  onLocationSelect: (location: Location) => void;
}

export default function Hero({
  query,
  setQuery,
  onSearch,
  onLocationSelect,
}: HeroProps) {
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        position: "relative",
        height: { xs: "60vh", sm: "70vh", md: "30vh" },
        alignItems: "center",
        // py: 8,
        // px: 2,
        backgroundColor: "#f5f5f5",
        color: "white",
        overflow: "visible",
        minHeight: 600,
        maxHeight: 800,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={"/src/assets/hero3.jpg"}
          alt="Sfondo immobiliare"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          }}
        />
      </Box>
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          px: { xs: 2, sm: 6, md: 8 },
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: "100%", lg: 1400, xl: 1600 },
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mx: "auto",
            textAlign: "left",
            marginLeft: {
              xs: 0,

              lg: "350px",
            },
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              mb: -1,
              fontWeight: 800,
              fontSize: {
                xs: "2.5rem",
                sm: "3.5rem",
                md: "4rem",
                lg: "4.5rem",
                xl: "5rem",
              },
              textShadow: "0 2px 8px rgba(0,0,0,0.4)",
              lineHeight: 1,
              letterSpacing: "-0.5px",
              maxWidth: 1100,
            }}
          >
            Trova la casa che fa per te
          </Typography>
          <Typography
            variant="h2"
            component="p"
            sx={{
              padding: 1.2,
              mb: { xs: 4, md: 6 },
              fontSize: {
                xs: "1.3rem",
                sm: "1.6rem",
                md: "1.9rem",
                lg: "2.2rem",
              },
              opacity: 0.95,
              textShadow: "0 1px 4px rgba(0,0,0,0.4)",
              fontWeight: 600,
            }}
          >
            È facile trovare la casa dei tuoi sogni.
          </Typography>
          <Box sx={{ maxWidth: 1100, width: "100%" }}>
            <SearchBar
              value={query}
              onChange={setQuery}
              onSearch={onSearch}
              onLocationSelect={onLocationSelect}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
