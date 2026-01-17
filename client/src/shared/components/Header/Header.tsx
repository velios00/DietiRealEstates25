import {
  AppBar,
  Toolbar,
  Typography,
  Divider,
  Button,
  Container,
  Avatar,
  Box,
} from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export default function Header() {
  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "0 0 32px 32px",
          paddingX: { xs: 2, md: 6 },
          paddingY: 1,
          height: { xs: "50px", md: "60px", lg: "75px" }, // ALTEZZA FISSA
          width: "100%",
          justifyContent: "center",
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
              }}
            >
              {/*Logo*/}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  component="img"
                  src={"/src/assets/Dieticolorato.png"}
                  alt="DIETI Logo"
                  sx={{
                    height: { xs: 40, md: 170 },
                    width: { xs: "auto", md: "auto" }, // Larghezza automatica
                    objectFit: "contain",
                    aspectRatio: "1080 / 1350", // Proporzioni originali
                  }}
                />
              </Box>
              {/*Nav menu*/}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  gap: 4,
                  paddingLeft: 20,
                }}
              >
                <Button
                  color="primary"
                  sx={{
                    color: "#62A1BA",
                    fontWeight: 800,
                    fontSize: "1.3rem",
                    textTransform: "lowercase",
                    "&:hover": {
                      color: "#62A1BA",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  compra
                </Button>

                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    backgroundColor: "#62A1BA",
                    height: 32,
                    marginY: "auto",
                  }}
                />

                <Button
                  color="primary"
                  sx={{
                    color: "#62A1BA",
                    fontWeight: 800,
                    fontSize: "1.3rem",
                    textTransform: "lowercase",
                    "&:hover": {
                      color: "#62A1BA",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  affitta
                </Button>

                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    backgroundColor: "#62A1BA",
                    height: 32,
                    marginY: "auto",
                  }}
                />

                <Button
                  color="primary"
                  sx={{
                    color: "#62A1BA",
                    fontWeight: 800,
                    fontSize: "1.3rem",
                    textTransform: "lowercase",
                    "&:hover": {
                      color: "#62A1BA",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  agenzie
                </Button>
              </Box>
            </Box>
            {/* Login Button */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="outlined"
                startIcon={
                  <Avatar
                    sx={{
                      backgroundColor: "#62A1BA",
                      width: 40,
                      height: 40,
                      marginRight: 0.5,
                      "&:hover": {
                        backgroundColor: "#62A1BA",
                      },
                    }}
                  >
                    <PersonOutlineIcon
                      sx={{ color: "white", fontSize: 40, px: 0.2 }}
                    />
                  </Avatar>
                }
                sx={{
                  color: "#62A1BA",
                  borderColor: "#62A1BA",
                  borderRadius: 28,
                  px: 3,
                  py: 1,
                  fontWeight: 800,
                  fontSize: "1.3rem",
                  textTransform: "lowercase",
                  "&:hover": {
                    borderColor: "#62A1BA",
                    backgroundColor: "rgba(98, 161, 186, 0.04)",
                  },
                }}
              >
                login
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
