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
          paddingX: { xs: 2, md: 4 },
          paddingY: 2,
        }}
        elevation={0}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 !important",
              minHeight: "auto !important",
            }}
          >
            {/*Logo*/}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                component="img"
                src={"/src/assets/Dieticolorato.png"}
                alt="DIETI Logo"
                sx={{
                  height: { xs: 30, md: 40 },
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </Box>
            {/*Nav menu*/}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 4,
              }}
            >
              <Button
                color="primary"
                sx={{
                  color: "#60a5fa",
                  fontWeight: 500,
                  fontSize: "1rem",
                  textTransform: "lowercase",
                  "&:hover": {
                    color: "#3b82f6",
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
                  backgroundColor: "grey.200",
                  height: 24,
                  marginY: "auto",
                }}
              />

              <Button
                color="primary"
                sx={{
                  color: "#60a5fa",
                  fontWeight: 500,
                  fontSize: "1rem",
                  textTransform: "lowercase",
                  "&:hover": {
                    color: "#3b82f6",
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
                  backgroundColor: "grey.200",
                  height: 24,
                  marginY: "auto",
                }}
              />

              <Button
                color="primary"
                sx={{
                  color: "#60a5fa",
                  fontWeight: 500,
                  fontSize: "1rem",
                  textTransform: "lowercase",
                  "&:hover": {
                    color: "#3b82f6",
                    backgroundColor: "transparent",
                  },
                }}
              >
                agenzie
              </Button>
            </Box>
            {/* Login Button */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="outlined"
                startIcon={
                  <Avatar
                    sx={{
                      backgroundColor: "#60a5fa",
                      width: 32,
                      height: 32,
                      marginRight: -0.5,
                      "&:hover": {
                        backgroundColor: "#3b82f6",
                      },
                    }}
                  >
                    <PersonOutlineIcon sx={{ color: "white", fontSize: 20 }} />
                  </Avatar>
                }
                sx={{
                  color: "#60a5fa",
                  borderColor: "#60a5fa",
                  borderRadius: 28,
                  px: 3,
                  py: 1,
                  fontWeight: 500,
                  fontSize: "1rem",
                  textTransform: "lowercase",
                  "&:hover": {
                    borderColor: "#3b82f6",
                    backgroundColor: "rgba(59, 130, 246, 0.04)",
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
