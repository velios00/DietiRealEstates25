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
  InputAdornment,
} from "@mui/material";
import {
  Close as CloseIcon,
  Person as PersonIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { CreateAgent } from "../../models/Agent.model";

interface CreateAgentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (agentData: CreateAgent) => Promise<void>;
  loading?: boolean;
}

export default function CreateAgentModal({
  open,
  onClose,
  onSubmit,
  loading = false,
}: CreateAgentModalProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateAgent>({
    email: "",
    name: "",
    surname: "",
  });

  const resetForm = () => {
    setFormData({
      email: "",
      name: "",
      surname: "",
    });
    setErrors({});
    setSubmitError(null);
  };

  // Reset form when modal opens/closes
  useEffect(() => {
    if (open) {
      resetForm();
    }
  }, [open]);

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
          "Si è verificato un errore durante la creazione dell'agente",
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
      fullWidth
      maxWidth="sm"
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: 5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
        },
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          bgcolor: "white",
          borderBottom: "1px solid #eee",
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton onClick={handleClose} disabled={loading}>
          <CloseIcon />
        </IconButton>
        <Typography fontWeight={800}>Crea Nuovo Agente</Typography>
        <Box width={40} />
      </Box>

      <Box sx={{ p: 3, flex: "1 1 auto", overflowY: "auto" }}>
        {submitError && (
          <Alert
            severity="error"
            sx={{ mb: 3, borderRadius: 2 }}
            onClose={() => setSubmitError(null)}
          >
            {submitError}
          </Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Campo Email */}
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "#62A1BA" }} />
                </InputAdornment>
              ),
            }}
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

          {/* Campo Nome */}
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: "#62A1BA" }} />
                </InputAdornment>
              ),
            }}
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

          {/* Campo Cognome */}
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: "#62A1BA" }} />
                </InputAdornment>
              ),
            }}
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

          {/* Nota informativa */}
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
              Una password temporanea verrà generata automaticamente e sarà
              inviata via email all'agente.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          bgcolor: "white",
          borderTop: "1px solid #e0e0e0",
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Button
          color="inherit"
          onClick={handleClose}
          disabled={loading}
          sx={{
            borderRadius: 4,
            px: 3,
            color: "#666",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.04)",
            },
          }}
        >
          Annulla
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={
            loading || !formData.email || !formData.name || !formData.surname
          }
          sx={{
            backgroundColor: "#62A1BA",
            borderRadius: 4,
            px: 4,
            display: "flex",
            alignItems: "center",
            gap: 1,
            "&:hover": {
              backgroundColor: "#4299b5",
            },
          }}
        >
          {loading && <CircularProgress size={20} color="inherit" />}
          {loading ? "Creazione..." : "Crea Agente"}
        </Button>
      </Box>
    </Dialog>
  );
}
