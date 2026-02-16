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
  managerEmail?: string;
  idAgency: number;
  onAddEstate?: () => void;
  onAddAgent?: () => void;
}

export default function AgencyCard({
  name,
  logo,
  description,
  manager,
  managerEmail,
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
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "flex-start" },
          gap: { xs: 2, sm: 3 },
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
            alignSelf: { xs: "center", sm: "flex-start" },
          }}
        />

        {/* Informazioni Agenzia */}
        <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: "#2c3e50",
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" },
              lineHeight: { xs: 1.2, sm: 1.25, md: 1.3 },
            }}
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
            <strong>Manager:</strong> {managerEmail && `${managerEmail} - `}
            {manager}
          </Typography>
        </Box>

        {/* Action Buttons in alto a destra */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: "column",
            alignItems: { xs: "stretch", sm: "flex-start" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          {onAddEstate && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onAddEstate}
              sx={{
                backgroundColor: "#62A1BA",
                fontSize: { xs: "0.875rem", sm: "0.95rem", md: "1rem" },
                fontWeight: 600,
                px: { xs: 2, sm: 2.5, md: 3 },
                py: { xs: 1, sm: 1.25, md: 1.5 },
                borderRadius: 3,
                whiteSpace: { xs: "normal", sm: "nowrap" },
                width: { xs: "100%", sm: "auto" },
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
                fontSize: { xs: "0.875rem", sm: "0.95rem", md: "1rem" },
                fontWeight: 600,
                px: { xs: 2, sm: 2.5, md: 3 },
                py: { xs: 1, sm: 1.25, md: 1.5 },
                borderRadius: 3,
                whiteSpace: { xs: "normal", sm: "nowrap" },
                width: { xs: "100%", sm: "auto" },
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
