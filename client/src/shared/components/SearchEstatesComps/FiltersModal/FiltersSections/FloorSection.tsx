import { Box, Button, Divider, Typography } from "@mui/material";

type FloorSectionProps = {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
};

const SECTION_TITLE_SX = { fontSize: 20, fontWeight: 600 } as const;

const floorOptions = [
  { value: 0, label: "Piano terra" },
  { value: 1, label: "Intermedi" },
  { value: 2, label: "Ultimo piano" },
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

export default function FloorSection({ value, onChange }: FloorSectionProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        sx={{
          ...SECTION_TITLE_SX,
          color: "#2c3e50",
          textAlign: "center",
          mb: 3,
        }}
      >
        Che piano preferisci?
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        {floorOptions.map((floor) => (
          <Button
            key={floor.value}
            variant={value === floor.value ? "contained" : "outlined"}
            onClick={() =>
              onChange(value === floor.value ? undefined : floor.value)
            }
            fullWidth
            sx={getButtonSx(value === floor.value)}
          >
            {floor.label}
          </Button>
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />
    </Box>
  );
}
