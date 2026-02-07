import { Box, Typography } from "@mui/material";

export default function AgentNoteSection() {
  return (
    <Box
      sx={{
        mt: 1,
        p: 2,
        backgroundColor: "#f0f7fa",
        borderRadius: 2,
        borderLeft: "4px solid #62A1BA",
      }}
    >
      <Typography
        variant="body2"
        color="#5d6d7e"
        sx={{ display: "flex", alignItems: "flex-start" }}
      >
        <Box component="span" sx={{ fontWeight: "bold", mr: 0.5 }}>
          Nota:
        </Box>
        Una password temporanea verrà generata automaticamente e sarà inviata
        via email all'agente.
      </Typography>
    </Box>
  );
}
