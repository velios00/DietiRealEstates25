import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";

interface ExternalOfferModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => Promise<void>;
  submitting: boolean;
  maxPrice: number;
}

export default function ExternalOfferModal({
  open,
  onClose,
  onSubmit,
  submitting,
  maxPrice,
}: ExternalOfferModalProps) {
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    if (!open) {
      setAmount("");
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!amount || isNaN(parseFloat(amount))) return;
    await onSubmit(parseFloat(amount));
  };

  const parsedAmount = parseFloat(amount);
  const hasValidAmount = amount !== "" && !isNaN(parsedAmount);
  const isValid =
    hasValidAmount && parsedAmount > 0 && parsedAmount <= maxPrice;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: { borderRadius: 3 },
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: 700 }}>
        Offerta Esterna
      </DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, textAlign: "center" }}
        >
          Inserisci l'importo dell'offerta ricevuta da un cliente esterno.
        </Typography>
        <TextField
          autoFocus
          fullWidth
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Inserisci importo"
          slotProps={{
            input: {
              inputProps: {
                step: "1000",
                min: "0",
              },
            },
          }}
        />
        {hasValidAmount && (
          <Box sx={{ pt: 1.5 }}>
            <Typography
              variant="caption"
              sx={{
                color: isValid ? "#4caf50" : "#ff9800",
                display: "block",
                textAlign: "center",
              }}
            >
              {isValid
                ? "Offerta valida"
                : parsedAmount <= 0
                  ? "L'importo deve essere maggiore di 0"
                  : "L'offerta non può superare il prezzo"}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClose} sx={{ textTransform: "none", color: "#666" }}>
          Annulla
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!isValid || submitting}
          sx={{ textTransform: "none" }}
        >
          {submitting ? "Invio..." : "Aggiungi"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
