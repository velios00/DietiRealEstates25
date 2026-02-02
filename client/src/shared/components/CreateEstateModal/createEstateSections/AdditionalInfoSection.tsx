import { TextField, Box } from "@mui/material";

export interface AdditionalInfoSectionProps {
  formData: {
    floor: string;
    energyClass: string;
  };
  energyClasses: string[];
  onFieldChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export default function AdditionalInfoSection({
  formData,
  energyClasses,
  onFieldChange,
}: AdditionalInfoSectionProps) {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {/* Piano */}
      <TextField
        fullWidth
        label="Piano"
        name="floor"
        type="number"
        value={formData.floor}
        onChange={onFieldChange}
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
          },
        }}
      />

      {/* Classe Energetica */}
      <TextField
        select
        fullWidth
        label="Classe Energetica"
        name="energyClass"
        value={formData.energyClass}
        onChange={onFieldChange}
        size="small"
        SelectProps={{
          native: true,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
          },
        }}
      >
        {energyClasses.map((cls) => (
          <option key={cls} value={cls}>
            {cls}
          </option>
        ))}
      </TextField>
    </Box>
  );
}
