import { Box, useMediaQuery, useTheme } from "@mui/material";
import Header from "../../shared/components/Header/Header";
import SearchResults from "../../shared/components/SearchResults/SearchResults";
import RightSidebar from "../../shared/components/RightSideBar.tsx/RightSideBar";

export default function SearchEstate() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Box sx={{ height: "64px" }} /> {/* Spacer per l'header fisso */}
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: "calc(100vh - 64px)",
          backgroundColor: "#f8f9fa",
        }}
      >
        {/* Colonna sinistra: Risultati della ricerca (ancora più ridotta) */}
        <Box
          sx={{
            flex: { xs: 1, md: 0.6 },
            overflowY: "auto",
            maxHeight: { md: "calc(100vh - 64px)" },
            pt: 2,
          }}
        >
          <SearchResults />
        </Box>

        {/* Colonna destra: Sidebar con searchbar/filtri + mappa (più ampia) */}
        <Box
          sx={{
            flex: { xs: 1, md: 1.4 },
            minWidth: { md: "640px" },
            borderLeft: { md: "1px solid #e0e0e0" },
            display: { xs: isMobile ? "block" : "none", md: "block" },
          }}
        >
          <RightSidebar />
        </Box>
      </Box>
    </>
  );
}
