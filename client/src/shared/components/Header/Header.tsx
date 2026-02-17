import {
  AppBar,
  Toolbar,
  Container,
  Box,
} from "@mui/material";

import AccountButton from "../AccountButton/AccountButton";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/Dieticolorato.png";

export default function Header() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "0 0 32px 32px",
          paddingX: { xs: 2, md: 6 },
          paddingY: 1,
          height: { xs: "50px", md: "60px", lg: "75px" }, // ALTEZZA FISSA
          width: "100%",
          justifyContent: "center",
          backgroundColor: "rgba(255, 255, 255, 0.85)", // Semi-trasparente
          backdropFilter: "blur(8px)", // Effetto blur per leggibilità
          zIndex: 1200, // Assicura che stia sopra tutto
        }}
        elevation={0}
      >
        <Container maxWidth={false}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 !important",
              minHeight: "auto !important",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 2, md: 6 }, // Spazio tra logo e menu
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              {/*Logo*/}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  component="img"
                  src={logo}
                  alt="DIETI Logo"
                  onClick={goHome}
                  sx={{
                    height: { xs: 80, sm: 110, md: 130, lg: 180 },
                    width: "auto",
                    objectFit: "contain",
                    aspectRatio: "1080 / 1350",
                  }}
                />
              </Box>
            </Box>
            <AccountButton />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
