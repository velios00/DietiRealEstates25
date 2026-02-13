import { Box, Grid, IconButton, Typography, Divider } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import BathtubIcon from "@mui/icons-material/Bathtub";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

type RoomsBathsSectionProps = {
  rooms: number;
  baths: number;
  onRoomsChange: (value: number) => void;
  onBathsChange: (value: number) => void;
};

const SECTION_TITLE_SX = { fontSize: 20, fontWeight: 600 } as const;

export default function RoomsBathsSection({
  rooms,
  baths,
  onRoomsChange,
  onBathsChange,
}: RoomsBathsSectionProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={3}>
        {/* LOCALI */}
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <HomeIcon sx={{ color: "#62A1BA" }} />
              <Typography sx={SECTION_TITLE_SX}>Locali</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                onClick={() => onRoomsChange(Math.max(0, rooms - 1))}
                size="small"
                sx={{
                  border: "2px solid #62A1BA",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography
                sx={{ minWidth: 32, textAlign: "center", fontWeight: 600 }}
              >
                {rooms}
              </Typography>
              <IconButton
                onClick={() => onRoomsChange(rooms + 1)}
                size="small"
                sx={{
                  border: "2px solid #62A1BA",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Grid>

        {/* BAGNI */}
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <BathtubIcon sx={{ color: "#62A1BA" }} />
              <Typography sx={SECTION_TITLE_SX}>Bagni</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                onClick={() => onBathsChange(Math.max(0, baths - 1))}
                size="small"
                sx={{
                  border: "2px solid #62A1BA",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography
                sx={{ minWidth: 32, textAlign: "center", fontWeight: 600 }}
              >
                {baths}
              </Typography>
              <IconButton
                onClick={() => onBathsChange(baths + 1)}
                size="small"
                sx={{
                  border: "2px solid #62A1BA",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />
    </Box>
  );
}
