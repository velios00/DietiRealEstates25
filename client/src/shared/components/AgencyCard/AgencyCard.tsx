import { Box, Typography, Button, Avatar } from "@mui/material";
import {
  Add as AddIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";

interface AgencyCardProps {
  name: string;
  logo: string;
  description: string;
  manager: string;
  idAgency: number;
  onAddEstate?: () => void;
  onAddAgent?: () => void;
}

export default function AgencyCard({
  name,
  logo,
  description,
  manager,
  idAgency,
  onAddEstate,
  onAddAgent,
}: AgencyCardProps) {
  return (
    <Box>
      {/* Header con Info Agenzia e Bottoni */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 3,
          mb: 3,
        }}
      >
        {/* Avatar Logo */}
        <Avatar
          src={logo}
          alt={name}
          sx={{
            width: 120,
            height: 120,
            border: "3px solid #62A1BA",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />

        {/* Informazioni Agenzia */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, mb: 1, color: "#2c3e50" }}
          >
            {name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#5d6d7e", mb: 2, lineHeight: 1.6 }}
          >
            {description}
          </Typography>
          <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
            <strong>Manager:</strong> {manager}
          </Typography>
        </Box>

        {/* Action Buttons in alto a destra */}
        <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
          {onAddEstate && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onAddEstate}
              sx={{
                backgroundColor: "#62A1BA",
                fontSize: "1rem",
                fontWeight: 600,
                px: 3,
                py: 1.5,
                borderRadius: 3,
                whiteSpace: "nowrap",
                "&:hover": {
                  backgroundColor: "#4a8ba3",
                },
              }}
            >
              Aggiungi Immobile
            </Button>
          )}

          {onAddAgent && (
            <Button
              variant="outlined"
              startIcon={<PersonAddIcon />}
              onClick={onAddAgent}
              sx={{
                borderColor: "#62A1BA",
                color: "#62A1BA",
                fontSize: "1rem",
                fontWeight: 600,
                px: 3,
                py: 1.5,
                borderRadius: 3,
                whiteSpace: "nowrap",
                "&:hover": {
                  borderColor: "#4a8ba3",
                  color: "#4a8ba3",
                  backgroundColor: "rgba(98, 161, 186, 0.04)",
                },
              }}
            >
              Aggiungi Agente
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
