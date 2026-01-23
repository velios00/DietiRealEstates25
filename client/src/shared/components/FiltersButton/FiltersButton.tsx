import { Button } from "@mui/material";
import { useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import FiltersModal from "../FiltersModal/FiltersModal";
export function FiltersButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<TuneIcon />}
        onClick={() => setOpen(true)}
        sx={{
          height: 65,
          borderRadius: 28,
          px: 3,
          whiteSpace: "nowrap",
        }}
      >
        Filtri
      </Button>

      <FiltersModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
