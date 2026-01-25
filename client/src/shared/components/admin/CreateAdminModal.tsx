import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { CreateAdminDTO } from "../../../types/user/user.types";

interface CreateAdminModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (adminData: CreateAdminDTO) => Promise<void>;
  loading?: boolean;
}

const CreateAdminModal: React.FC<CreateAdminModalProps> = ({
  open,
  onClose,
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    surname: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (open) {
      resetForm();
    }
  }, [open]);

  const resetForm = () => {
    setFormData({
      email: "",
      name: "",
      surname: "",
    });
    setErrors({});
    setSubmitError(null);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "L'email è obbligatoria";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Inserisci un'email valida";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Il nome è obbligatorio";
    }

    if (!formData.surname.trim()) {
      newErrors.surname = "Il cognome è obbligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async () => {
    console.log("FormData prima del submit:", formData);
    console.log("Email:", formData.email, "Type:", typeof formData.email);
    console.log("Name:", formData.name, "Type:", typeof formData.name);
    console.log("Surname:", formData.surname, "Type:", typeof formData.surname);
    if (!validateForm()) {
      return;
    }

    setSubmitError(null);

    try {
      await onSubmit(formData);
      // Success is handled by parent component
    } catch (error: any) {
      setSubmitError(
        error.message ||
          "Si è verificato un errore durante la creazione dell'admin",
      );
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
        },
      }}
      sx={{
        "& .MuiDialog-paper": {
          alignItems: "center",
        },
        pt: 5,
        pb: 3,
        px: 3,
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: "1px solid #e0e0e0",
          pb: 2,
          position: "relative",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="#2c3e50">
          Crea Nuovo Amministratore
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: "#7f8c8d",
          }}
          disabled={loading}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, pb: 2 }}>
        {submitError && (
          <Alert
            severity="error"
            sx={{ mb: 2, borderRadius: 2 }}
            onClose={() => setSubmitError(null)}
          >
            {submitError}
          </Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            disabled={loading}
            required
            autoComplete="off"
            autoFocus
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": {
                  borderColor: "#62A1BA",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#62A1BA",
                  borderWidth: 2,
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            disabled={loading}
            required
            autoComplete="off"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": {
                  borderColor: "#62A1BA",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#62A1BA",
                  borderWidth: 2,
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Cognome"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            error={!!errors.surname}
            helperText={errors.surname}
            disabled={loading}
            required
            autoComplete="off"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": {
                  borderColor: "#62A1BA",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#62A1BA",
                  borderWidth: 2,
                },
              },
            }}
          />

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
              Una password temporanea verrà generata automaticamente e dovrebbe
              essere inviata via email all'utente.
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          pt: 2,
          borderTop: "1px solid #e0e0e0",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Button
          onClick={handleClose}
          disabled={loading}
          sx={{
            color: "#62A1BA",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "rgba(98, 161, 186, 0.08)",
            },
          }}
        >
          Annulla
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={
            loading || !formData.email || !formData.name || !formData.surname
          }
          startIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : undefined
          }
          sx={{
            backgroundColor: "#62A1BA",
            fontWeight: 600,
            borderRadius: 2,
            px: 3,
            py: 1,
            "&:hover": {
              backgroundColor: "#4a8ba3",
            },
            "&.Mui-disabled": {
              backgroundColor: "#cccccc",
              color: "#666666",
            },
          }}
        >
          {loading ? "Creazione..." : "Crea Admin"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAdminModal;
