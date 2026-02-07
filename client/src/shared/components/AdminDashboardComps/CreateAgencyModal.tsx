import React, { useState, useRef, useCallback } from "react";
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
  TextField, // Aggiunto per le icone
} from "@mui/material"; // Aggiunto InputAdornment
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
import { CreateAgency } from "../../models/Agency.model";
import { createAgency } from "../../../services/AgencyService";
import BasicInfoSection from "./AgencyModalSections/BasicInfoSection";
import DescriptionSection from "./AgencyModalSections/DescriptionSection";
import LogoUploadSection from "./AgencyModalSections/LogoUploadSection";
import ManagerInfoSection from "./AgencyModalSections/ManagerInfoSection";

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

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
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
        // Validazione
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
        if (!selectedFile) {
          throw new Error("Il logo agenzia è obbligatorio");
        }

        const agencyData = new FormData();
        agencyData.append("agencyName", formData.agencyName);
        agencyData.append("address", formData.address);
        agencyData.append("description", formData.description);
        agencyData.append("phoneNumber", formData.phoneNumber);
        agencyData.append("url", formData.url);
        agencyData.append("managerName", formData.manager.name);
        agencyData.append("managerSurname", formData.manager.surname);
        agencyData.append("managerEmail", formData.manager.email);
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
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography fontWeight={800}>Crea Agenzia</Typography>
        </Box>
        <Box width={40} /> {/* Spazio per bilanciare la larghezza */}
      </Box>

      {/* CONTENUTO SCROLLABILE */}
      <Box sx={{ p: 3, flex: "1 1 auto", overflowY: "auto" }}>
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3, borderRadius: 2 }}
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* BasicInfoSection con icone */}
          <Box>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Informazioni Base
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Nome Agenzia"
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
                label="Indirizzo"
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
                label="Telefono"
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

          {/* DescriptionSection con icona */}
          <Box>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Descrizione
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Descrizione Agenzia"
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

          {/* LogoUploadSection con icona */}
          <Box>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Logo Agenzia
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

          {/* ManagerInfoSection con icone */}
          <Box>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Informazioni Manager
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Nome Manager"
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
                label="Cognome Manager"
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
                label="Email Manager"
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
          disabled={loading}
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
          {loading ? "Creazione..." : "Crea Agenzia"}
        </Button>
      </Box>
    </Dialog>
  );
}
