import { TextField, Box, Typography, Button } from "@mui/material";

export interface BasicInfoSectionProps {
  formData: {
    title: string;
    type: string;
    description: string;
  };
  onFieldChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onTypeChange: (type: string) => void;
}

const transactionTypes = [
  { value: "vendita", label: "Vendita" },
  { value: "affitto", label: "Affitto" },
];

export default function BasicInfoSection({
  formData,
  onFieldChange,
  onTypeChange,
}: BasicInfoSectionProps) {
  return (
    <>
      {/* Titolo */}
      <TextField
        fullWidth
        label="Titolo *"
        name="title"
        value={formData.title}
        onChange={onFieldChange}
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
          },
        }}
      />

      {/* Tipo di Transazione */}
      <Box>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 600,
            color: "#2c3e50",
            mb: 1.5,
          }}
        >
          Tipo di Transazione *
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {transactionTypes.map((option) => (
            <Button
              key={option.value}
              variant={
                formData.type === option.value ? "contained" : "outlined"
              }
              onClick={() => onTypeChange(option.value)}
              sx={{
                flex: 1,
                borderRadius: 4,
                backgroundColor:
                  formData.type === option.value ? "#62A1BA" : undefined,
                borderColor: "#62A1BA",
                color: formData.type === option.value ? "white" : "#62A1BA",
                "&:hover": {
                  backgroundColor:
                    formData.type === option.value
                      ? "#4a8ba3"
                      : "rgba(98, 161, 186, 0.1)",
                },
              }}
            >
              {option.label}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Descrizione */}
      <TextField
        fullWidth
        label="Descrizione *"
        name="description"
        value={formData.description}
        onChange={onFieldChange}
        multiline
        rows={3}
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
          },
        }}
      />
    </>
  );
}
