import { useCallback, useState, useRef, useMemo } from "react";
import { createEstate } from "../../../services/EstateService";
import {
  Dialog,
  Box,
  IconButton,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BasicInfoSection from "./createEstateSections/BasicInfoSection";
import PhotoUploadSection from "./createEstateSections/PhotoUploadSection";
import PropertyDetailsSection from "./createEstateSections/PropertyDetailsSection";
import LocationSection from "./createEstateSections/LocationSection";
import AdditionalInfoSection from "./createEstateSections/AdditionalInfoSection";

export interface CreateEstateModalProps {
  open: boolean;
  onClose: () => void;
  idAgency: number;
  onEstateCreated: () => void;
}

export default function CreateEstateModal({
  open,
  onClose,
  idAgency,
  onEstateCreated,
}: CreateEstateModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    size: "",
    address: "",
    city: "",
    type: "vendita",
    nRooms: "",
    nBathrooms: "",
    energyClass: "C",
    floor: "",
  });

  const energyClasses = ["A+", "A", "B", "C", "D", "E", "F", "G"];

  const validationResult = useMemo(() => {
    // Campi testuali obbligatori
    if (!formData.title.trim()) {
      return { isValid: false, error: "Il titolo è obbligatorio" };
    }
    if (!formData.address.trim()) {
      return { isValid: false, error: "L'indirizzo è obbligatorio" };
    }
    if (!formData.city.trim()) {
      return { isValid: false, error: "La città è obbligatoria" };
    }

    // Prezzo: deve essere > 0 e intero
    if (!formData.price) {
      return { isValid: false, error: "Il prezzo è obbligatorio" };
    }
    if (parseFloat(formData.price) <= 0) {
      return { isValid: false, error: "Il prezzo deve essere maggiore di 0" };
    }
    if (!Number.isInteger(Number(formData.price))) {
      return { isValid: false, error: "Il prezzo non può avere centesimi" };
    }

    // Metratura: deve essere > 0 e intero
    if (!formData.size) {
      return { isValid: false, error: "La metratura è obbligatoria" };
    }
    if (parseFloat(formData.size) <= 0) {
      return {
        isValid: false,
        error: "La metratura deve essere maggiore di 0",
      };
    }
    if (!Number.isInteger(Number(formData.size))) {
      return { isValid: false, error: "La metratura non può avere decimali" };
    }

    // Numero locali: deve essere > 0
    if (!formData.nRooms) {
      return { isValid: false, error: "Il numero di locali è obbligatorio" };
    }
    if (parseInt(formData.nRooms) <= 0) {
      return {
        isValid: false,
        error: "Il numero di locali deve essere maggiore di 0",
      };
    }

    // Numero bagni: deve essere > 0
    if (!formData.nBathrooms) {
      return { isValid: false, error: "Il numero di bagni è obbligatorio" };
    }
    if (parseInt(formData.nBathrooms) <= 0) {
      return {
        isValid: false,
        error: "Il numero di bagni deve essere maggiore di 0",
      };
    }

    if (parseInt(formData.nBathrooms) >= parseInt(formData.nRooms)) {
      return {
        isValid: false,
        error: "Il numero di bagni deve essere inferiore al numero di locali",
      };
    }

    // Foto: almeno 3, massimo 10
    if (selectedFiles.length < 3) {
      return { isValid: false, error: "Aggiungi almeno 3 foto" };
    }
    if (selectedFiles.length > 10) {
      return { isValid: false, error: "Puoi caricare al massimo 10 foto" };
    }

    return { isValid: true, error: null };
  }, [formData, selectedFiles]);

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

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const filesArray = Array.from(e.target.files);
        const newFiles = [...selectedFiles, ...filesArray].slice(0, 10);
        setSelectedFiles(newFiles);
        setError(null);
      }
    },
    [selectedFiles],
  );

  const handleRemoveFile = useCallback((index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setError(null);
  }, []);

  const handleFileUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      title: "",
      description: "",
      price: "",
      size: "",
      address: "",
      city: "",
      type: "vendita",
      nRooms: "",
      nBathrooms: "",
      energyClass: "C",
      floor: "",
    });
    setSelectedFiles([]);
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
        if (!formData.title.trim()) {
          throw new Error("Il titolo è obbligatorio");
        }
        if (!formData.price || parseFloat(formData.price) <= 0) {
          throw new Error("Il prezzo deve essere maggiore di 0");
        }
        if (!Number.isInteger(Number(formData.price))) {
          throw new Error("Il prezzo non può avere centesimi");
        }
        if (!formData.size || parseFloat(formData.size) <= 0) {
          throw new Error("La metratura deve essere maggiore di 0");
        }
        if (!Number.isInteger(Number(formData.size))) {
          throw new Error("La metratura non può avere decimali");
        }
        if (!formData.nRooms || parseInt(formData.nRooms) <= 0) {
          throw new Error("Il numero di locali deve essere maggiore di 0");
        }
        if (!formData.nBathrooms || parseInt(formData.nBathrooms) <= 0) {
          throw new Error("Il numero di bagni deve essere maggiore di 0");
        }
        if (!formData.address.trim()) {
          throw new Error("L'indirizzo è obbligatorio");
        }
        if (!formData.city.trim()) {
          throw new Error("La città è obbligatoria");
        }
        if (selectedFiles.length < 3) {
          throw new Error("Aggiungi almeno 3 foto");
        }
        if (selectedFiles.length > 10) {
          throw new Error("Puoi caricare al massimo 10 foto");
        }
        if (parseInt(formData.nBathrooms) >= parseInt(formData.nRooms)) {
          throw new Error(
            "Il numero di bagni deve essere inferiore al numero di locali",
          );
        }

        const estateData = new FormData();
        estateData.append("title", formData.title.trim());
        estateData.append("description", formData.description.trim());
        estateData.append("price", formData.price);
        estateData.append("size", formData.size);
        estateData.append("address", formData.address.trim());
        estateData.append("city", formData.city.trim());
        estateData.append("type", formData.type);
        estateData.append("nRooms", formData.nRooms);
        estateData.append("nBathrooms", formData.nBathrooms);
        estateData.append("energyClass", formData.energyClass);
        estateData.append("idAgency", idAgency.toString());
        if (formData.floor) {
          estateData.append("floor", formData.floor);
        }

        selectedFiles.forEach((file) => {
          estateData.append("photos", file);
        });

        await createEstate(estateData);

        onEstateCreated();
        handleClose();
      } catch (err: any) {
        console.error("Errore nella creazione dell'immobile:", err);
        setError(err.message || "Errore nella creazione dell'immobile");
      } finally {
        setLoading(false);
      }
    },
    [formData, selectedFiles, idAgency, onEstateCreated, handleClose],
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
          maxHeight: "70vh",
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
        <Typography fontWeight={800}>Crea Immobile</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* CONTENUTO SCROLLABILE */}
      <Box sx={{ p: 3, flex: "1 1 auto", overflowY: "auto" }}>
        {(error || (!isFormValid && validationResult.error)) && (
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
              {error || validationResult.error}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <BasicInfoSection
            formData={{
              title: formData.title,
              type: formData.type,
              description: formData.description,
            }}
            onFieldChange={handleChange}
            onTypeChange={(type) => setFormData((prev) => ({ ...prev, type }))}
          />

          <PhotoUploadSection
            selectedFiles={selectedFiles}
            fileInputRef={fileInputRef}
            onFileSelect={handleFileSelect}
            onFileUploadClick={handleFileUploadClick}
            onRemoveFile={handleRemoveFile}
          />

          <Divider />

          <PropertyDetailsSection
            formData={{
              price: formData.price,
              size: formData.size,
              nRooms: formData.nRooms,
              nBathrooms: formData.nBathrooms,
            }}
            onFieldChange={handleChange}
          />

          <LocationSection
            formData={{
              address: formData.address,
              city: formData.city,
            }}
            onFieldChange={handleChange}
          />

          <AdditionalInfoSection
            formData={{
              floor: formData.floor,
              energyClass: formData.energyClass,
            }}
            energyClasses={energyClasses}
            onFieldChange={handleChange}
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
          disabled={loading || !isFormValid}
          sx={{
            backgroundColor: "#62A1BA",
            borderRadius: 4,
            px: 4,
            "&:hover": {
              backgroundColor: "#4299b5",
            },
            "&.Mui-disabled": {
              backgroundColor: "#ccc",
              color: "#888",
            },
          }}
        >
          {loading ? "Creazione..." : "Crea Immobile"}
        </Button>
      </Box>
    </Dialog>
  );
}
