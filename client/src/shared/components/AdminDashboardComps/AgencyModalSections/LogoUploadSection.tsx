import { Box, Typography, Button, Avatar } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

export interface LogoUploadSectionProps {
  selectedFile: File | null;
  logoPreview: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileUploadClick: () => void;
  onRemoveFile: () => void;
}

export default function LogoUploadSection({
  selectedFile,
  logoPreview,
  fileInputRef,
  onFileSelect,
  onFileUploadClick,
  onRemoveFile,
}: LogoUploadSectionProps) {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 600,
          color: "#2c3e50",
          mb: 1.5,
        }}
      >
        Logo Agenzia *
      </Typography>

      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileSelect}
        accept="image/*"
        style={{ display: "none" }}
      />

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {logoPreview ? (
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={logoPreview}
              alt="Logo preview"
              sx={{
                width: 100,
                height: 100,
                borderRadius: 2,
                border: "2px solid #62A1BA",
              }}
            />
            <Button
              size="small"
              onClick={onRemoveFile}
              sx={{
                position: "absolute",
                bottom: -8,
                right: -8,
                backgroundColor: "#f44336",
                color: "white",
                minWidth: "auto",
                padding: "4px",
                "&:hover": {
                  backgroundColor: "#d32f2f",
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </Button>
          </Box>
        ) : null}

        <Button
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          onClick={onFileUploadClick}
          sx={{
            borderRadius: 3,
            borderColor: "#62A1BA",
            color: "#62A1BA",
            flex: 1,
            "&:hover": {
              backgroundColor: "rgba(98, 161, 186, 0.1)",
            },
          }}
        >
          {selectedFile ? "Cambia Logo" : "Carica Logo"}
        </Button>
      </Box>
    </Box>
  );
}
