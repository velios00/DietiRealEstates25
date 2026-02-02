import { TextField, Box } from "@mui/material";

export interface BasicInfoSectionProps {
  formData: {
    agencyName: string;
    address: string;
    phoneNumber: string;
    url: string;
  };
  onFieldChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export default function BasicInfoSection({
  formData,
  onFieldChange,
}: BasicInfoSectionProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        fullWidth
        label="Nome Agenzia *"
        name="agencyName"
        value={formData.agencyName}
        onChange={onFieldChange}
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
          },
        }}
      />

      <TextField
        fullWidth
        label="Indirizzo *"
        name="address"
        value={formData.address}
        onChange={onFieldChange}
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
          },
        }}
      />

      <TextField
        fullWidth
        label="Telefono *"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={onFieldChange}
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
          },
        }}
      />

      <TextField
        fullWidth
        label="Sito Web"
        name="url"
        value={formData.url}
        onChange={onFieldChange}
        type="url"
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
          },
        }}
      />
    </Box>
  );
}
