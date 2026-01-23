import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Button,
  Slider,
  Divider,
  Chip,
  Grid,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import BathtubIcon from "@mui/icons-material/Bathtub";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function FiltersModal({ open, onClose }: Props) {
  const SECTION_TITLE_SX = { fontSize: 20, fontWeight: 600 } as const;
  const [tipoContratto, setTipoContratto] = useState<string>("affitto");
  const [prezzoMin, setPrezzoMin] = useState<number>(20000);
  const [prezzoMax, setPrezzoMax] = useState<number>(1000000);
  const [locali, setLocali] = useState<number>(0);
  const [bagni, setBagni] = useState<number>(0);
  const [superficieMin, setSuperficieMin] = useState<number>(10);
  const [superficieMax, setSuperficieMax] = useState<number>(200);
  const [piano, setPiano] = useState<string>("");
  const [classeEnergetica, setClasseEnergetica] = useState<string>("");
  const resetFiltri = () => {
    setTipoContratto("affitto");
    setPrezzoMin(20000);
    setPrezzoMax(1000000);
    setLocali(0);
    setBagni(0);
    setSuperficieMin(10);
    setSuperficieMax(200);
    setPiano("");
    setClasseEnergetica("");
  };
  const applicaFiltri = () => {
    // Logica per applicare i filtri
    onClose();
  };

  const classiEnergetiche = ["a+", "a", "b", "c", "d", "e", "f", "g"];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          maxHeight: "70vh",
          height: { xs: "auto", sm: "auto" },
          margin: { xs: 0, sm: "auto" },
          maxWidth: { xs: "100%", sm: "500px" },
        },
      }}
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
        <Typography fontWeight={800}>Filtri</Typography>
        <Box width={40} />
      </Box>

      {/* contenuto scrollabile */}
      <Box sx={{ p: 3, flex: "1 1 auto", overflowY: "auto" }}>
        {/* Tipo Contratto */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Button
              variant={tipoContratto === "affitto" ? "contained" : "outlined"}
              onClick={() => setTipoContratto("affitto")}
              fullWidth
              sx={{
                borderRadius: 28,
                py: 1.5,
                borderColor: tipoContratto === "affitto" ? "#62A1BA" : "#ccc",
                backgroundColor:
                  tipoContratto === "affitto" ? "#62A1BA" : "transparent",
                color: tipoContratto === "affitto" ? "white" : "#666",
                "&:hover": {
                  backgroundColor:
                    tipoContratto === "affitto"
                      ? "#62A1BA"
                      : "rgba(0,0,0,0.04)",
                  borderColor: tipoContratto === "affitto" ? "#62A1BA" : "#999",
                },
              }}
            >
              Affitto
            </Button>
            <Button
              variant={tipoContratto === "vendita" ? "contained" : "outlined"}
              onClick={() => setTipoContratto("vendita")}
              fullWidth
              sx={{
                borderRadius: 28,
                py: 1.5,
                borderColor: tipoContratto === "vendita" ? "#62A1BA" : "#ccc",
                backgroundColor:
                  tipoContratto === "vendita" ? "#62A1BA" : "transparent",
                color: tipoContratto === "vendita" ? "white" : "#666",
                "&:hover": {
                  backgroundColor:
                    tipoContratto === "vendita"
                      ? "#62A1BA"
                      : "rgba(0,0,0,0.04)",
                  borderColor: tipoContratto === "vendita" ? "#62A1BA" : "#999",
                },
              }}
            >
              In vendita
            </Button>
          </Box>
          <Divider sx={{ my: 3 }} />
        </Box>

        {/* Fascia di Prezzo */}
        <Typography sx={{ ...SECTION_TITLE_SX, mb: 2, textAlign: "center" }}>
          Fascia di prezzo
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Chip
            label={`€ ${prezzoMin.toLocaleString("it-IT")}`}
            variant="outlined"
            sx={{ borderColor: "#62A1BA", color: "#000000" }}
          />
          <Chip
            label={`€ ${prezzoMax.toLocaleString("it-IT")}`}
            variant="outlined"
            sx={{ borderColor: "#62A1BA", color: "#000000" }}
          />
        </Box>

        <Slider
          value={[prezzoMin, prezzoMax]}
          onChange={(_, newValue) => {
            const [min, max] = newValue as number[];
            setPrezzoMin(min);
            setPrezzoMax(max);
          }}
          min={20000}
          max={1000000}
          step={1000}
          sx={{
            color: "#62A1BA",
            "& .MuiSlider-track": {
              border: "none",
            },
            "& .MuiSlider-thumb": {
              height: 20,
              width: 20,
              backgroundColor: "#fff",
              border: "2px solid #62A1BA",
              "&:focus, &:hover, &.Mui-active": {
                boxShadow: "0 0 0 8px rgba(98, 161, 186, 0.16)",
              },
            },
          }}
        />

        <Divider sx={{ my: 3 }} />

        {/* Locali e Bagni */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3}>
            {/* LOCALI */}
            <Grid size={{ xs: 10 }}>
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
                    onClick={() => setLocali(Math.max(0, locali - 1))}
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
                    {locali}
                  </Typography>
                  <IconButton
                    onClick={() => setLocali(locali + 1)}
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
            <Grid size={{ xs: 10 }}>
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
                    onClick={() => setBagni(Math.max(0, bagni - 1))}
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
                    {bagni}
                  </Typography>
                  <IconButton
                    onClick={() => setBagni(bagni + 1)}
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
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* STANZE */}
        <Typography sx={{ ...SECTION_TITLE_SX, mb: 2 }}>Stanze</Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Button
              key={n}
              variant="outlined"
              sx={{ borderColor: "#62A1BA", color: "#62A1BA" }}
            >
              {n}+
            </Button>
          ))}
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* SUPERFICIE */}
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              ...SECTION_TITLE_SX,
              color: "#2c3e50",
              textAlign: "center",
              mb: 3,
            }}
          >
            Superficie
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Chip
              label={`${superficieMin} mq`}
              variant="outlined"
              sx={{ borderColor: "#62A1BA", color: "#000000" }}
            />
            <Chip
              label={`${superficieMax} mq`}
              variant="outlined"
              sx={{ borderColor: "#62A1BA", color: "#000000" }}
            />
          </Box>

          <Slider
            value={[superficieMin, superficieMax]}
            onChange={(_, newValue) => {
              const [min, max] = newValue as number[];
              setSuperficieMin(min);
              setSuperficieMax(max);
            }}
            min={20}
            max={70}
            step={1}
            sx={{
              color: "#62A1BA",
              "& .MuiSlider-track": {
                border: "none",
              },
              "& .MuiSlider-thumb": {
                height: 20,
                width: 20,
                backgroundColor: "#fff",
                border: "2px solid #62A1BA",
                "&:focus, &:hover, &.Mui-active": {
                  boxShadow: "0 0 0 8px rgba(98, 161, 186, 0.16)",
                },
              },
            }}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* PIANO */}
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
            {[
              { value: "terra", label: "Piano terra" },
              { value: "intermedi", label: "Intermedi" },
              { value: "ultimo", label: "Ultimo piano" },
            ].map((p) => (
              <Button
                key={p.value}
                variant={piano === p.value ? "contained" : "outlined"}
                onClick={() => setPiano(p.value)}
                fullWidth
                sx={{
                  borderRadius: 28,
                  py: 1.5,
                  borderColor: piano === p.value ? "#62A1BA" : "#ccc",
                  backgroundColor:
                    piano === p.value ? "#62A1BA" : "transparent",
                  color: piano === p.value ? "white" : "#666",
                  "&:hover": {
                    backgroundColor:
                      piano === p.value ? "#62A1BA" : "rgba(0,0,0,0.04)",
                    borderColor: piano === p.value ? "#62A1BA" : "#999",
                  },
                }}
              >
                {p.label}
              </Button>
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* CLASSE ENERGETICA */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <HomeIcon sx={{ color: "#62A1BA" }} />
              <Typography sx={SECTION_TITLE_SX}>Classe Energetica</Typography>
            </Box>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <Select
                value={classeEnergetica}
                onChange={(e) => setClasseEnergetica(e.target.value)}
                displayEmpty
                IconComponent={ExpandMoreIcon}
                sx={{
                  borderRadius: 20,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ccc",
                  },
                }}
              >
                {classiEnergetiche.map((classe) => (
                  <MenuItem key={classe} value={classe}>
                    {classe.charAt(0).toUpperCase() + classe.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          bgcolor: "white",
          borderTop: "1px solid #e0e0e0",
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Button
          color="inherit"
          onClick={resetFiltri}
          sx={{
            borderRadius: 2,
            px: 3,
            color: "#666",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.04)",
            },
          }}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          onClick={applicaFiltri}
          sx={{
            backgroundColor: "#62A1BA",
            borderRadius: 2,
            px: 4,
            "&:hover": {
              backgroundColor: "#4299b5",
            },
          }}
        >
          Applica filtri
        </Button>
      </Box>
    </Dialog>
  );
}
