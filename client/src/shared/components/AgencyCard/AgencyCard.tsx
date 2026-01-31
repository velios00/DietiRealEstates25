import { Box, Typography, Avatar, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Roles } from "../../enums/Roles.enum";
import { getUserAgencyId } from "../../../services/UserService";
import AddIcon from "@mui/icons-material/Add";

interface AgencyCardProps {
  name: string;
  logo: string;
  description: string;
  manager: string;
  idAgency: number;
}

export default function AgencyCard({
  name,
  logo,
  description,
  manager,
  idAgency,
}: AgencyCardProps) {
  const userContext = useContext(UserContext);
  const [isUserOfAgency, setIsUserOfAgency] = useState(false);
  const user = userContext?.user;

  useEffect(() => {
    const checkIfUserBelongsToAgency = async () => {
      if (!user || (user.role !== Roles.AGENT && user.role !== Roles.MANAGER)) {
        setIsUserOfAgency(false);
        return;
      }

      try {
        const response = await getUserAgencyId(parseInt(user.idUser));
        const userAgencyId = response.data?.idAgency ?? response.data;
        setIsUserOfAgency(Number(userAgencyId) === Number(idAgency));
      } catch (err) {
        console.log("Errore nel controllo dell'agenzia dell'utente:", err);
        setIsUserOfAgency(false);
      }
    };

    checkIfUserBelongsToAgency();
  }, [user, idAgency]);
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            gap={2}
          >
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

            {/* Bottone Carica Immobile */}
            {isUserOfAgency && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  backgroundColor: "#62A1BA",
                  color: "white",
                  fontWeight: 600,
                  textTransform: "none",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "#4a7f99",
                  },
                }}
              >
                Carica Immobile
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
