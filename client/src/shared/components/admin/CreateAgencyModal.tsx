import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
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
import { CreateAgencyDTO } from "../../models/Agency.model";

interface CreateAgencyModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (agencyData: CreateAgencyDTO) => void;
}

const CreateAgencyModal: React.FC<CreateAgencyModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<CreateAgencyDTO>({
    agencyName: "",
    address: "",
    description: "",
    profileImage: "",
    phoneNumber: "",
    url: "",
    manager: {
      name: "",
      surname: "",
      email: "",
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.agencyName.trim()) newErrors.agencyName = "Nome obbligatorio";
    if (!formData.address.trim()) newErrors.address = "Indirizzo obbligatorio";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Telefono obbligatorio";
    if (!formData.manager.name.trim())
      newErrors.managerName = "Nome manager obbligatorio";
    if (!formData.manager.surname.trim())
      newErrors.managerSurname = "Cognome manager obbligatorio";
    if (!formData.manager.email.trim())
      newErrors.managerEmail = "Email obbligatoria";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await onSubmit(formData);
      handleClose();
    } catch (err: any) {
      setSubmitError(err.message || "Errore nella creazione dell'agenzia");
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

    if (name.startsWith("manager.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        manager: { ...prev.manager, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          alignItems: "center",
        },
      }}
      PaperProps={{ sx: { borderRadius: 4 } }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: 600 }}>
        Crea Agenzia
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          {submitError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {submitError}
            </Alert>
          )}

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Nome Agenzia"
              name="agencyName"
              value={formData.agencyName}
              onChange={handleChange}
              error={!!errors.agencyName}
              helperText={errors.agencyName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Telefono"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Indirizzo"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Sito Web"
              name="url"
              value={formData.url}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LanguageIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Descrizione"
              name="description"
              multiline
              rows={3}
              value={formData.description}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Typography fontWeight={600} mt={1}>
              Manager
            </Typography>

            <TextField
              label="Nome"
              name="manager.name"
              value={formData.manager.name}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Cognome"
              name="manager.surname"
              value={formData.manager.surname}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Email"
              name="manager.email"
              type="email"
              value={formData.manager.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                textAlign: "center",
                fontWeight: 600,
                borderRadius: 4,
                py: 1.5,
                backgroundColor: "#62A1BA",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#4a8ba3",
                },
              }}
              disabled={submitting}
            >
              {submitting ? "Creazione..." : "Crea Agenzia"}
            </Button>
          </Box>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateAgencyModal;
