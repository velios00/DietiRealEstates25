import { Box, Button, Divider } from "@mui/material";

type ContractTypeSectionProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function ContractTypeSection({
  value,
  onChange,
}: ContractTypeSectionProps) {
  const contractTypes = [
    { key: "affitto", label: "Affitto" },
    { key: "vendita", label: "In vendita" },
  ];

  const getButtonSx = (isActive: boolean) => ({
    borderRadius: 28,
    py: 1.5,
    borderColor: isActive ? "#62A1BA" : "#ccc",
    backgroundColor: isActive ? "#62A1BA" : "transparent",
    color: isActive ? "white" : "#666",
    "&:hover": {
      backgroundColor: isActive ? "#62A1BA" : "rgba(0,0,0,0.04)",
      borderColor: isActive ? "#62A1BA" : "#999",
    },
  });

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        {contractTypes.map((type) => (
          <Button
            key={type.key}
            variant={value === type.key ? "contained" : "outlined"}
            onClick={() => onChange(type.key)}
            fullWidth
            sx={getButtonSx(value === type.key)}
          >
            {type.label}
          </Button>
        ))}
      </Box>
      <Divider sx={{ my: 3 }} />
    </Box>
  );
}
