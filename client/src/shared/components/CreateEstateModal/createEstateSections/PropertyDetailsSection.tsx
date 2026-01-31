import { TextField, Box } from "@mui/material";

export interface PropertyDetailsSectionProps {
  formData: {
    price: string;
    size: string;
    nRooms: string;
    nBathrooms: string;
  };
  onFieldChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export default function PropertyDetailsSection({
  formData,
  onFieldChange,
}: PropertyDetailsSectionProps) {
  return (
    <>
      {/* Prezzo */}
      <TextField
        fullWidth
        label="Prezzo ($) *"
        name="price"
        type="number"
        value={formData.price}
        onChange={onFieldChange}
        size="small"
        inputProps={{ step: "0.01" }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
          },
        }}
      />

      {/* Metratura */}
      <TextField
        fullWidth
        label="Metratura (mq) *"
        name="size"
        type="number"
        value={formData.size}
        onChange={onFieldChange}
        size="small"
        inputProps={{ step: "0.01" }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
          },
        }}
      />

      {/* Locali e Bagni */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          label="Locali *"
          name="nRooms"
          type="number"
          value={formData.nRooms}
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
          label="Bagni *"
          name="nBathrooms"
          type="number"
          value={formData.nBathrooms}
          onChange={onFieldChange}
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />
      </Box>
    </>
  );
}
