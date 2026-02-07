import { TextField, Box, InputAdornment } from "@mui/material";
import { Person as PersonIcon, Email as EmailIcon } from "@mui/icons-material";

export interface AgentBasicInfoSectionProps {
  formData: {
    email: string;
    name: string;
    surname: string;
  };
  errors: Record<string, string>;
  loading?: boolean;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AgentBasicInfoSection({
  formData,
  errors,
  loading = false,
  onFieldChange,
}: AgentBasicInfoSectionProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        fullWidth
        label="Email *"
        name="email"
        type="email"
        value={formData.email}
        onChange={onFieldChange}
        error={!!errors.email}
        helperText={errors.email}
        disabled={loading}
        required
        autoComplete="off"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{ color: "#62A1BA" }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "&:hover fieldset": {
              borderColor: "#62A1BA",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#62A1BA",
              borderWidth: 2,
            },
          },
        }}
      />

      <TextField
        fullWidth
        label="Nome *"
        name="name"
        value={formData.name}
        onChange={onFieldChange}
        error={!!errors.name}
        helperText={errors.name}
        disabled={loading}
        required
        autoComplete="off"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{ color: "#62A1BA" }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "&:hover fieldset": {
              borderColor: "#62A1BA",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#62A1BA",
              borderWidth: 2,
            },
          },
        }}
      />

      <TextField
        fullWidth
        label="Cognome *"
        name="surname"
        value={formData.surname}
        onChange={onFieldChange}
        error={!!errors.surname}
        helperText={errors.surname}
        disabled={loading}
        required
        autoComplete="off"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{ color: "#62A1BA" }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "&:hover fieldset": {
              borderColor: "#62A1BA",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#62A1BA",
              borderWidth: 2,
            },
          },
        }}
      />
    </Box>
  );
}
