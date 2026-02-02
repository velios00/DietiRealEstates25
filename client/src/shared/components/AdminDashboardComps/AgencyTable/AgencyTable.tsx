// src/components/admin/AgencyTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";
import { Agency } from "../../../models/Agency.model";
import { useEffect } from "react";

interface AgencyTableProps {
  agencies: Agency[];
  loading: boolean;
}

export default function AgencyTable({ agencies, loading }: AgencyTableProps) {
  useEffect(() => {
    if (agencies.length > 0) {
      console.log("DEBUG - Prima agenzia:", {
        agencyName: agencies[0].agencyName,
        idManager: agencies[0].idManager,
        managerName: agencies[0].managerName,
        manager: agencies[0].manager,
        hasManager: !!agencies[0].manager,
        managerKeys: agencies[0].manager
          ? Object.keys(agencies[0].manager)
          : [],
      });
    }
  }, [agencies]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={400}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (agencies.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <BusinessIcon sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Nessuna agenzia trovata
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Crea la tua prima agenzia utilizzando il pulsante "Crea Agenzia"
        </Typography>
      </Box>
    );
  }

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        "& .MuiTableCell-root": {
          fontSize: "1.05rem", // Dimensione base aumentata
        },
        "& .MuiTypography-body1": {
          fontSize: "1.1rem",
          fontWeight: 500,
        },
        "& .MuiTypography-body2": {
          fontSize: "1rem",
        },
        "& .MuiTableCell-head": {
          fontSize: "1.15rem",
          fontWeight: 600,
        },
        "& .MuiAvatar-root": {
          width: 56,
          height: 56,
          fontSize: "1.5rem",
        },
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Agenzia</TableCell>
            <TableCell>Manager</TableCell>
            <TableCell>Contatti</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {agencies.map((agency) => (
            <TableRow key={agency.idAgency} hover>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Avatar
                    src={agency.profileImage || undefined}
                    sx={{ mr: 2, bgcolor: "primary.main" }}
                  >
                    {getInitials(agency.agencyName)}
                  </Avatar>
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {agency.agencyName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      display="flex"
                      alignItems="center"
                    >
                      <LocationIcon
                        fontSize="small"
                        sx={{ mr: 0.5, fontSize: 14 }}
                      />
                      {agency.address}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box>
                  <Typography variant="body1">{agency.managerName}</Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    display="flex"
                    alignItems="center"
                  >
                    {agency.manager?.email}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box>
                  <Typography
                    variant="body2"
                    display="flex"
                    alignItems="center"
                    mb={0.5}
                  >
                    <PhoneIcon
                      fontSize="small"
                      sx={{ mr: 0.5, fontSize: 14 }}
                    />
                    {agency.phoneNumber}
                  </Typography>
                  {agency.url && (
                    <Typography variant="body2" color="primary">
                      <a
                        href={agency.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Sito Web
                      </a>
                    </Typography>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
