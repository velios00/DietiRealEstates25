import React, { useState, useRef, useCallback } from "react";
import {
  Dialog,
  Box,
  Button,
  Typography,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
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

        console.log("📤 Invio FormData:", {
          agencyName: formData.agencyName,
          address: formData.address,
          description: formData.description,
          phoneNumber: formData.phoneNumber,
          url: formData.url,
          managerName: formData.manager.name,
          managerSurname: formData.manager.surname,
          managerEmail: formData.manager.email,
          hasFile: !!selectedFile,
        });

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
        <Typography fontWeight={800}>Crea Agenzia</Typography>
        <Box width={40} />
      </Box>

      {/* CONTENUTO SCROLLABILE */}
      <Box sx={{ p: 3, flex: "1 1 auto", overflowY: "auto" }}>
        {error && (
          <Box
            sx={{
              bgcolor: "#fee",
              borderRadius: 4,
              p: 2,
              mb: 3,
              border: "1px solid #fcc",
            }}
          >
            <Typography sx={{ color: "#c00", fontSize: 14 }}>
              {error}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <BasicInfoSection
            formData={{
              agencyName: formData.agencyName,
              address: formData.address,
              phoneNumber: formData.phoneNumber,
              url: formData.url,
            }}
            onFieldChange={handleChange}
          />

          <DescriptionSection
            description={formData.description}
            onFieldChange={handleChange}
          />

          <LogoUploadSection
            selectedFile={selectedFile}
            logoPreview={logoPreview}
            fileInputRef={fileInputRef}
            onFileSelect={handleFileSelect}
            onFileUploadClick={handleFileUploadClick}
            onRemoveFile={handleRemoveFile}
          />

          <Divider />

          <ManagerInfoSection
            managerData={formData.manager}
            onManagerChange={handleManagerChange}
          />
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
