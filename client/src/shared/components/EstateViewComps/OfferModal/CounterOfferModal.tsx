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

interface CounterOfferModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => Promise<void>;
  submitting: boolean;
  minAmount: number;
}

export default function CounterOfferModal({
  open,
  onClose,
  onSubmit,
  submitting,
  minAmount,
}: CounterOfferModalProps) {
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
  const isValid = hasValidAmount && parsedAmount >= minAmount;

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
        Controfferta
      </DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
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
              {isValid ? "Offerta valida" : "Offerta troppo bassa"}
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
          disabled={!amount || isNaN(parseFloat(amount)) || submitting}
          sx={{ textTransform: "none" }}
        >
          {submitting ? "Invio..." : "Invia"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
