import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Alert,
  IconButton,
  Chip,
  InputAdornment,
  Paper,
} from "@mui/material";
import {
  Close as CloseIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Language as LanguageIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import {
  AgencyResponseDTO,
  CreateAgencyDTO,
} from "../../../types/agency/agency.types";

interface EditAgencyModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (idAgency: string, updateData: Partial<CreateAgencyDTO>) => void;
  agency: AgencyResponseDTO;
}

const EditAgencyModal: React.FC<EditAgencyModalProps> = ({
  open,
  onClose,
  onSubmit,
  agency,
}) => {
  const [formData, setFormData] = useState<Partial<CreateAgencyDTO>>({
    agencyName: "",
    address: "",
    description: "",
    profileImage: "",
    phoneNumber: "",
    url: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (agency) {
      setFormData({
        agencyName: agency.agencyName,
        address: agency.address,
        description: agency.description || "",
        profileImage: agency.profileImage || "",
        phoneNumber: agency.phoneNumber,
        url: agency.url || "",
      });
    }
  }, [agency]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.agencyName?.trim())
      newErrors.agencyName = "Il nome agenzia è obbligatorio";
    if (!formData.address?.trim())
      newErrors.address = "L'indirizzo è obbligatorio";
    if (!formData.phoneNumber?.trim())
      newErrors.phoneNumber = "Il telefono è obbligatorio";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await onSubmit(agency.idAgency, formData);
      handleClose();
    } catch (err: any) {
      setSubmitError(err.message || "Errore nell'aggiornamento dell'agenzia");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setErrors({});
    setSubmitError(null);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (!agency) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">
            <BusinessIcon sx={{ mr: 1, verticalAlign: "middle" }} />
            Modifica Agenzia: {agency.agencyName}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          {submitError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {submitError}
            </Alert>
          )}

          {/* Manager Info */}
          <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: "info.light" }}>
            <Typography variant="subtitle2" gutterBottom color="primary">
              Manager Associato
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography
                  variant="body2"
                  display="flex"
                  alignItems="center"
                  mb={1}
                >
                  <PersonIcon sx={{ mr: 1, fontSize: 16 }} />
                  <strong>Nome:</strong> &nbsp;{agency.manager?.name}{" "}
                  {agency.manager?.surname}
                </Typography>
                <Typography variant="body2" display="flex" alignItems="center">
                  <EmailIcon sx={{ mr: 1, fontSize: 16 }} />
                  <strong>Email:</strong> &nbsp;{agency.manager?.email}
                </Typography>
              </Box>
              <Chip
                label="Manager Attivo"
                size="small"
                color="success"
                variant="outlined"
              />
            </Box>
          </Paper>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Nome Agenzia *"
                name="agencyName"
                value={formData.agencyName}
                onChange={handleChange}
                error={!!errors.agencyName}
                helperText={errors.agencyName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                disabled={submitting}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Telefono *"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                disabled={submitting}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Indirizzo *"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                disabled={submitting}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Sito Web"
                name="url"
                value={formData.url}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LanguageIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                disabled={submitting}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Immagine Profilo (URL)"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                disabled={submitting}
                placeholder="https://esempio.com/immagine.jpg"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Descrizione"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                disabled={submitting}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} disabled={submitting}>
            Annulla
          </Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? "Salvataggio..." : "Salva Modifiche"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditAgencyModal;
