import React, { useState, useRef, ChangeEvent } from "react";
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
  Avatar,
  CircularProgress,
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
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Allowed file types for logo
  const allowedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
  ];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

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

  const handleLogoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!allowedFileTypes.includes(file.type)) {
      setSubmitError(
        "Formato file non supportato. Usa JPEG, PNG, GIF, WebP o SVG.",
      );
      return;
    }

    // Validate file size
    if (file.size > maxFileSize) {
      setSubmitError("File troppo grande. Dimensione massima: 5MB.");
      return;
    }

    setUploadingLogo(true);
    setSubmitError(null);

    try {
      // In a real application, you would upload to a server here
      // For now, we'll create a base64 string for preview and storage
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;

        // Set preview
        setLogoPreview(base64String);

        // Store file data
        setLogoFile(file);

        // Update form data with base64 string
        setFormData((prev) => ({
          ...prev,
          profileImage: base64String,
        }));

        setUploadingLogo(false);
      };

      reader.onerror = () => {
        setSubmitError("Errore nella lettura del file");
        setUploadingLogo(false);
      };

      reader.readAsDataURL(file);
    } catch (err: any) {
      setSubmitError("Errore nell'upload del logo: " + err.message);
      setUploadingLogo(false);
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
    setLogoFile(null);
    setFormData((prev) => ({
      ...prev,
      profileImage: "",
    }));

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      // In a real application, you would upload the file first
      // and then submit the form with the URL
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
    setLogoPreview(null);
    setLogoFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
            {/* Logo Upload Section */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Logo Agenzia
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {logoPreview ? (
                  <Box sx={{ position: "relative" }}>
                    <Avatar
                      src={logoPreview}
                      alt="Logo preview"
                      sx={{
                        width: 100,
                        height: 100,
                        border: "2px dashed #ddd",
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={handleRemoveLogo}
                      sx={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        backgroundColor: "white",
                        boxShadow: 1,
                        "&:hover": {
                          backgroundColor: "grey.100",
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ) : (
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      border: "2px dashed #ddd",
                      backgroundColor: "grey.100",
                    }}
                  >
                    <AddPhotoIcon sx={{ fontSize: 40, color: "grey.400" }} />
                  </Avatar>
                )}

                <Box>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    style={{ display: "none" }}
                    id="logo-upload"
                  />
                  <label htmlFor="logo-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={
                        uploadingLogo ? (
                          <CircularProgress size={20} />
                        ) : (
                          <AddPhotoIcon />
                        )
                      }
                      disabled={uploadingLogo}
                    >
                      {uploadingLogo ? "Caricamento..." : "Carica Logo"}
                    </Button>
                  </label>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{ display: "block", mt: 1 }}
                  >
                    JPEG, PNG, GIF, WebP o SVG. Max 5MB
                  </Typography>
                </Box>
              </Box>
            </Box>

            <TextField
              label="Nome Agenzia"
              name="agencyName"
              value={formData.agencyName}
              onChange={handleChange}
              error={!!errors.agencyName}
              helperText={errors.agencyName}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Telefono"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Indirizzo"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Sito Web"
              name="url"
              value={formData.url}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Descrizione"
              name="description"
              multiline
              rows={3}
              value={formData.description}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon />
                    </InputAdornment>
                  ),
                },
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
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Cognome"
              name="manager.surname"
              value={formData.manager.surname}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Email"
              name="manager.email"
              type="email"
              value={formData.manager.email}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon />
                    </InputAdornment>
                  ),
                },
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
