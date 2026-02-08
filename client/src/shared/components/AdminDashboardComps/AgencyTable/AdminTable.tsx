// src/components/admin/AgencyTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Chip,
  Typography,
  Box,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
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
    <TableContainer component={Paper}>
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
                    {agency.manager?.name} {agency.manager?.surname}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    display="flex"
                    alignItems="center"
                  >
                    <EmailIcon
                      fontSize="small"
                      sx={{ mr: 0.5, fontSize: 14 }}
                    />
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
              <TableCell>
                <Chip
                  label="Attiva"
                  size="small"
                  color="success"
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {agency.createdAt
                    ? new Date(agency.createdAt).toLocaleDateString("it-IT")
                    : "N/A"}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Box display="flex" justifyContent="center" gap={1}></Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
