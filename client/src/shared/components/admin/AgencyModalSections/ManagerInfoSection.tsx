import { TextField, Box, Typography } from "@mui/material";

export interface ManagerInfoSectionProps {
  managerData: {
    name: string;
    surname: string;
    email: string;
  };
  onManagerChange: (field: string, value: string) => void;
}

export default function ManagerInfoSection({
  managerData,
  onManagerChange,
}: ManagerInfoSectionProps) {
  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onManagerChange(field, e.target.value);
    };

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
        Informazioni Manager *
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          fullWidth
          label="Nome Manager *"
          value={managerData.name}
          onChange={handleChange("name")}
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />

        <TextField
          fullWidth
          label="Cognome Manager *"
          value={managerData.surname}
          onChange={handleChange("surname")}
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />

        <TextField
          fullWidth
          label="Email Manager *"
          type="email"
          value={managerData.email}
          onChange={handleChange("email")}
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />
      </Box>
    </Box>
  );
}
