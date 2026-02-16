import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      style={{
        position: "static",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        height: "60px",
        backgroundColor: "#62A1BA",
        backdropFilter: "blur(8px)",
        boxShadow: "0px -4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "32px 32px 0 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" color="white">
          Dieti Real Estates - Informazioni legali fac-simile.
        </Typography>
        <Typography variant="caption" color="white" display="block">
          Privacy e termini di servizio - Tutti i diritti riservati.
        </Typography>
      </Box>
    </Box>
  );
}
