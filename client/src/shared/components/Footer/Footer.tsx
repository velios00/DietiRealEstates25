import { Box, Typography, Portal } from "@mui/material";

export default function Footer() {
  return (
    <Portal>
      <Box
        component="footer"
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          height: { xs: "50px", md: "60px", lg: "75px" },
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(8px)",
          boxShadow: "0px -4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "32px 32px 0 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          paddingX: { xs: 2, md: 6 },
        }}
      >
        <Box>
          <Typography variant="caption" color="text.secondary">
            Dieti Real Estates - Informazioni legali fac-simile.
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            Privacy e termini di servizio - Tutti i diritti riservati.
          </Typography>
        </Box>
      </Box>
    </Portal>
  );
}
