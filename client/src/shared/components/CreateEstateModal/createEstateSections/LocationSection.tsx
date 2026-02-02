import { TextField } from "@mui/material";

export interface LocationSectionProps {
  formData: {
    address: string;
    city: string;
  };
  onFieldChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export default function LocationSection({
  formData,
  onFieldChange,
}: LocationSectionProps) {
  return (
    <>
      {/* Indirizzo */}
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

      {/* Città */}
      <TextField
        fullWidth
        label="Città *"
        name="city"
        value={formData.city}
        onChange={onFieldChange}
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
