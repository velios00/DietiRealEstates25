import React, { useState, useRef, useCallback, useMemo } from "react";
import {
  Alert,
  Dialog,
  Box,
  Button,
  Typography,
  IconButton,
  Divider,
  CircularProgress,
  InputAdornment,
  TextField,
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
  AddPhotoAlternate as AddPhotoIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { createAgency } from "../../../services/AgencyService";

interface CreateAgencyModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function CreateAgencyModal({
  open,
  onClose,
  onSubmit,
}: CreateAgencyModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    agencyName: "",
    address: "",
    description: "",
    phoneNumber: "",
    url: "",
    manager: {
      name: "",
      surname: "",
      email: "",
    },
  });

  const validationResult = useMemo(() => {
    // Nome agenzia
    if (!formData.agencyName.trim()) {
      return { isValid: false, error: "Il nome agenzia è obbligatorio" };
    }

    // Indirizzo
    if (!formData.address.trim()) {
      return { isValid: false, error: "L'indirizzo è obbligatorio" };
    }

    // Telefono
    if (!formData.phoneNumber.trim()) {
      return { isValid: false, error: "Il telefono è obbligatorio" };
    }
    // Validazione formato telefono (base)
    if (!/^\+?[0-9\s\-()]{8,}$/.test(formData.phoneNumber.trim())) {
      return { isValid: false, error: "Formato telefono non valido" };
    }

    // Descrizione
    if (!formData.description.trim()) {
      return { isValid: false, error: "La descrizione è obbligatoria" };
    }

    // Nome manager
    if (!formData.manager.name.trim()) {
      return { isValid: false, error: "Il nome del manager è obbligatorio" };
    }

    // Cognome manager
    if (!formData.manager.surname.trim()) {
      return { isValid: false, error: "Il cognome del manager è obbligatorio" };
    }

    // Email manager
    if (!formData.manager.email.trim()) {
      return { isValid: false, error: "L'email del manager è obbligatoria" };
    }
    // Validazione formato email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.manager.email)) {
      return { isValid: false, error: "Formato email non valido" };
    }

    // Logo
    if (!selectedFile) {
      return { isValid: false, error: "Il logo agenzia è obbligatorio" };
    }

    // URL (opzionale ma se presente deve essere valido)
    if (formData.url.trim() && !/^https?:\/\/.+/.test(formData.url)) {
      return {
        isValid: false,
        error: "Formato URL non valido (deve iniziare con http:// o https://)",
      };
    }

    return { isValid: true, error: null };
  }, [formData, selectedFile]);

  const isFormValid = validationResult.isValid;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      setError(null);
    },
    [],
  );

  const handleManagerChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      manager: {
        ...prev.manager,
        [field]: value,
      },
    }));

    setError(null);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setSelectedFile(file);

        // Crea anteprima
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        setError(null);
      }
    },
    [],
  );

  const handleFileUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      agencyName: "",
      address: "",
      description: "",
      phoneNumber: "",
      url: "",
      manager: {
        name: "",
        surname: "",
        email: "",
      },
    });
    setSelectedFile(null);
    setLogoPreview(null);
    setError(null);
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      try {
        // Validazione (già garantita da isFormValid, ma manteniamo per sicurezza)
        if (!formData.agencyName.trim()) {
          throw new Error("Il nome agenzia è obbligatorio");
        }
        if (!formData.address.trim()) {
          throw new Error("L'indirizzo è obbligatorio");
        }
        if (!formData.phoneNumber.trim()) {
          throw new Error("Il telefono è obbligatorio");
        }
        if (!formData.description.trim()) {
          throw new Error("La descrizione è obbligatoria");
        }
        if (!formData.manager.name.trim()) {
          throw new Error("Il nome del manager è obbligatorio");
        }
        if (!formData.manager.surname.trim()) {
          throw new Error("Il cognome del manager è obbligatorio");
        }
        if (!formData.manager.email.trim()) {
          throw new Error("L'email del manager è obbligatoria");
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.manager.email)) {
          throw new Error("Formato email non valido");
        }
        if (!selectedFile) {
          throw new Error("Il logo agenzia è obbligatorio");
        }

        const agencyData = new FormData();
        agencyData.append("agencyName", formData.agencyName.trim());
        agencyData.append("address", formData.address.trim());
        agencyData.append("description", formData.description.trim());
        agencyData.append("phoneNumber", formData.phoneNumber.trim());
        agencyData.append("url", formData.url.trim());
        agencyData.append("managerName", formData.manager.name.trim());
        agencyData.append("managerSurname", formData.manager.surname.trim());
        agencyData.append("managerEmail", formData.manager.email.trim());
        if (selectedFile) {
          agencyData.append("profileImage", selectedFile);
        }

        await createAgency(agencyData);
        onSubmit();
        handleClose();
      } catch (err: any) {
        console.error("Errore nella creazione dell'agenzia:", err);
        setError(err.message || "Errore nella creazione dell'agenzia");
      } finally {
        setLoading(false);
      }
    },
    [formData, selectedFile, onSubmit, handleClose],
  );

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
        <Box width={40} />
        <Typography fontWeight={800}>Crea Agenzia</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* CONTENUTO SCROLLABILE */}
      <Box sx={{ p: 3, flex: "1 1 auto", overflowY: "auto" }}>
        {(error || (!isFormValid && validationResult.error)) && (
          <Alert
            severity="error"
            sx={{ mb: 3, borderRadius: 2 }}
            onClose={() => setError(null)}
          >
            {error || validationResult.error}
          </Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Informazioni Base */}
          <Box>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Informazioni Base
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Nome Agenzia *"
                name="agencyName"
                value={formData.agencyName}
                onChange={handleChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessIcon sx={{ color: "#62A1BA" }} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              <TextField
                fullWidth
                label="Indirizzo *"
                name="address"
                value={formData.address}
                onChange={handleChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationIcon sx={{ color: "#62A1BA" }} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              <TextField
                fullWidth
                label="Telefono *"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon sx={{ color: "#62A1BA" }} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              <TextField
                fullWidth
                label="Sito Web (URL)"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="https://esempio.com"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LanguageIcon sx={{ color: "#62A1BA" }} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>
          </Box>

          {/* Descrizione */}
          <Box>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Descrizione
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Descrizione Agenzia *"
              name="description"
              value={formData.description}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ mt: 1, alignSelf: "flex-start" }}
                    >
                      <DescriptionIcon sx={{ color: "#62A1BA" }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Logo Upload */}
          <Box>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Logo Agenzia *
            </Typography>
            <Box
              sx={{
                border: "2px dashed #ddd",
                borderRadius: 2,
                p: 3,
                textAlign: "center",
                bgcolor: "#fafafa",
                cursor: "pointer",
                "&:hover": {
                  borderColor: "#62A1BA",
                  bgcolor: "#f0f7fa",
                },
              }}
              onClick={handleFileUploadClick}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                style={{ display: "none" }}
              />
              <AddPhotoIcon sx={{ fontSize: 48, color: "#62A1BA", mb: 2 }} />
              <Typography color="#666" mb={1}>
                Clicca per caricare il logo
              </Typography>
              <Typography variant="caption" color="#999">
                Formati supportati: JPG, PNG, SVG
              </Typography>
            </Box>
            {logoPreview && (
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <img
                  src={logoPreview}
                  alt="Anteprima logo"
                  style={{
                    maxWidth: "100%",
                    maxHeight: 200,
                    borderRadius: 8,
                  }}
                />
                <Button
                  startIcon={<DeleteIcon />}
                  onClick={handleRemoveFile}
                  sx={{ mt: 1 }}
                  color="error"
                  size="small"
                >
                  Rimuovi
                </Button>
              </Box>
            )}
          </Box>

          <Divider />

          {/* Informazioni Manager */}
          <Box>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Informazioni Manager
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Nome Manager *"
                value={formData.manager.name}
                onChange={(e) => handleManagerChange("name", e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: "#62A1BA" }} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              <TextField
                fullWidth
                label="Cognome Manager *"
                value={formData.manager.surname}
                onChange={(e) => handleManagerChange("surname", e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: "#62A1BA" }} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              <TextField
                fullWidth
                label="Email Manager *"
                type="email"
                value={formData.manager.email}
                onChange={(e) => handleManagerChange("email", e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "#62A1BA" }} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>
          </Box>

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
              Una password temporanea verrà generata automaticamente e dovrebbe
              essere inviata via email all'utente.
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
          disabled={loading || !isFormValid}
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
            "&.Mui-disabled": {
              backgroundColor: "#ccc",
              color: "#888",
            },
          }}
        >
          {loading && <CircularProgress size={20} color="inherit" />}
          {loading ? "Creazione..." : "Crea Agenzia"}
        </Button>
      </Box>
    </Dialog>
  );
}
