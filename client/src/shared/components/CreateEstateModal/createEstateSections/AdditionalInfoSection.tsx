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
  const floorOptions = [
    { value: "0", label: "Piano Terra" },
    { value: "1", label: "Piano intermedio" },
    { value: "2", label: "Ultimo piano" },
  ];

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {/* Piano */}
      <TextField
        select
        fullWidth
        label="Piano"
        name="floor"
        value={formData.floor}
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
        <option value="">Seleziona</option>
        {floorOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>

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
