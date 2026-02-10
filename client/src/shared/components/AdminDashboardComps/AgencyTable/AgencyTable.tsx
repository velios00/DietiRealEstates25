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
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { Agency } from "../../../models/Agency.model";

interface AgencyTableProps {
  agencies: Agency[];
  loading: boolean;
}

export default function AgencyTable({ agencies, loading }: AgencyTableProps) {
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
          fontSize: "1.05rem",
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
                  <Typography variant="body1">
                    {agency.manager
                      ? `${agency.manager.name} ${agency.manager.surname}`
                      : "N/A"}
                  </Typography>
                  {agency.manager?.email && (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      display="flex"
                      alignItems="center"
                      sx={{ mt: 0.5 }}
                    >
                      <EmailIcon
                        fontSize="small"
                        sx={{ mr: 0.5, fontSize: 14 }}
                      />
                      {agency.manager.email}
                    </Typography>
                  )}
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
