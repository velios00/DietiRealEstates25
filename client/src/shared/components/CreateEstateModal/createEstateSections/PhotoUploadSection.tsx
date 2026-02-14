import { Box, Typography, Button, Chip } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageIcon from "@mui/icons-material/Image";

export interface PhotoUploadSectionProps {
  selectedFiles: File[];
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileUploadClick: () => void;
  onRemoveFile: (index: number) => void;
}

export default function PhotoUploadSection({
  selectedFiles,
  fileInputRef,
  onFileSelect,
  onFileUploadClick,
  onRemoveFile,
}: PhotoUploadSectionProps) {
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
        Foto ({selectedFiles.length}/10) *
      </Typography>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileSelect}
        multiple
        accept="image/*"
        style={{ display: "none" }}
      />
      <Button
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        onClick={onFileUploadClick}
        fullWidth
        disabled={selectedFiles.length >= 10}
        sx={{
          borderRadius: 4,
          borderColor: "#62A1BA",
          color: "#62A1BA",
          "&:hover": {
            backgroundColor: "rgba(98, 161, 186, 0.1)",
          },
        }}
      >
        Seleziona Foto
      </Button>

      {selectedFiles.length > 0 && (
        <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
          {selectedFiles.map((file, index) => (
            <Chip
              key={index}
              icon={<ImageIcon sx={{ color: "#62A1BA" }} />}
              label={`${file.name}`}
              onDelete={() => onRemoveFile(index)}
              variant="outlined"
              sx={{
                borderColor: "#62A1BA",
                borderRadius: 4,
                "& .MuiChip-icon": {
                  color: "#62A1BA",
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
