import { TextField } from "@mui/material";

export interface DescriptionSectionProps {
  description: string;
  onFieldChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export default function DescriptionSection({
  description,
  onFieldChange,
}: DescriptionSectionProps) {
  return (
    <TextField
      fullWidth
      label="Descrizione *"
      name="description"
      value={description}
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
  );
}
