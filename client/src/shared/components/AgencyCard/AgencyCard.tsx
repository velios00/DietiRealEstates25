import { Box, Typography, Avatar } from "@mui/material";

interface AgencyCardProps {
  name: string;
  logo: string;
  description: string;
  manager: string;
}

export default function AgencyCard({
  name,
  logo,
  description,
  manager,
}: AgencyCardProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box display="flex" gap={4} alignItems="center">
        {/* SINISTRA: Logo e Manager */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          minWidth={180}
          textAlign="center"
        >
          <Avatar
            src={logo}
            alt={`Logo ${name}`}
            sx={{
              width: 100,
              height: 100,
              mb: 1.5,
              border: "2px solid #62A1BA",
            }}
          />
          <Typography variant="subtitle2" color="text.secondary">
            Manager: <strong>{manager}</strong>
          </Typography>
        </Box>

        {/* DESTRA: Testi principali */}
        <Box flex={1}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#2c3e50", mb: 1 }}
          >
            {name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#7f8c8d", lineHeight: 1.6 }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
