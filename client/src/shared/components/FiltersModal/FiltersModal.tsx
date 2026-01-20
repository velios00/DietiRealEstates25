import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Button,
  Slider,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function FiltersModal({ open, onClose }: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      scroll="paper"
    >
      {/* HEADER */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          bgcolor: "white",
          borderBottom: "1px solid #eee",
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Typography fontWeight={600}>Filtri</Typography>
        <Box width={40} />
      </Box>

      {/* BODY */}
      <Box sx={{ p: 3 }}>
        {/* PREZZO */}
        <Typography fontWeight={600} mb={2}>
          Fascia di prezzo
        </Typography>
        <Slider min={50000} max={500000} step={5000} valueLabelDisplay="auto" />

        <Divider sx={{ my: 4 }} />

        {/* STANZE */}
        <Typography fontWeight={600} mb={2}>
          Stanze
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Button key={n} variant="outlined">
              {n}+
            </Button>
          ))}
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* altri filtri qui */}
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          bgcolor: "white",
          borderTop: "1px solid #eee",
          p: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button color="inherit">Reset</Button>
        <Button variant="contained" onClick={onClose}>
          Applica filtri
        </Button>
      </Box>
    </Dialog>
  );
}
