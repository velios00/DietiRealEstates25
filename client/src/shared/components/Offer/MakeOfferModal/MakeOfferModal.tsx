import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  TextField,
  Slider,
  Alert,
  InputAdornment,
  CircularProgress,
  Paper,
} from "@mui/material";
import {
  Close as CloseIcon,
  AttachMoney as AttachMoneyIcon,
  TrendingUp as TrendingUpIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

interface MakeOfferModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (offerAmount: number) => Promise<void>;
  startingPrice: number;
  highestOffer?: number;
  loading?: boolean;
}

const MakeOfferModal: React.FC<MakeOfferModalProps> = ({
  open,
  onClose,
  onSubmit,
  startingPrice,
  highestOffer = startingPrice,
  loading = false,
}) => {
  const [offerAmount, setOfferAmount] = useState<number>(highestOffer + 10000);
  const [error, setError] = useState<string | null>(null);

  const minOffer = highestOffer + 5000;
  const maxOffer = startingPrice * 1.2; // 20% sopra il prezzo di partenza

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setOfferAmount(newValue as number);
    setError(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value) || 0;
    setOfferAmount(value);
    setError(null);
  };

  const handleSubmit = async () => {
    if (offerAmount < minOffer) {
      setError(
        `L'offerta deve essere di almeno ${formatCurrency(
          minOffer,
        )} per superare l'offerta più alta attuale.`,
      );
      return;
    }

    if (offerAmount > maxOffer) {
      setError(`L'offerta non può superare il ${formatCurrency(maxOffer)}.`);
      return;
    }

    try {
      await onSubmit(offerAmount);
    } catch (err: any) {
      setError(
        err.message || "Si è verificato un errore nell'invio dell'offerta",
      );
    }
  };

  const handleClose = () => {
    setError(null);
    setOfferAmount(highestOffer + 10000);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
        },
      }}
      sx={{
        "& .MuiDialog-paper": {
          alignItems: "center",
        },
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: "1px solid #e0e0e0",
          pb: 2,
          position: "relative",
          backgroundColor: "#f8f9fa",
          width: "100%",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold" color="#2c3e50">
            Proponi Offerta
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: "#7f8c8d",
            }}
            disabled={loading}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, pb: 2 }}>
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3, borderRadius: 2 }}
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        {/* Info prezzo */}
        <Paper
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 3,
            backgroundColor: "#f0f7fa",
            borderLeft: "4px solid #62A1BA",
          }}
        >
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2" color="#5d6d7e">
              Prezzo di partenza:
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {formatCurrency(startingPrice)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="#5d6d7e">
              Offerta più alta attuale:
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {formatCurrency(highestOffer)}
            </Typography>
          </Box>
        </Paper>

        {/* Slider per offerta */}
        <Box mb={3}>
          <Typography gutterBottom fontWeight={600} mb={2}>
            Seleziona il tuo importo:
          </Typography>
          <Slider
            value={offerAmount}
            onChange={handleSliderChange}
            min={minOffer}
            max={maxOffer}
            step={5000}
            marks={[
              { value: minOffer, label: formatCurrency(minOffer) },
              { value: maxOffer, label: formatCurrency(maxOffer) },
            ]}
            valueLabelDisplay="auto"
            valueLabelFormat={formatCurrency}
            sx={{
              color: "#62A1BA",
              "& .MuiSlider-valueLabel": {
                backgroundColor: "#62A1BA",
              },
            }}
            disabled={loading}
          />
        </Box>

        {/* Input manuale */}
        <Box mb={3}>
          <TextField
            fullWidth
            label="La tua offerta"
            value={offerAmount}
            onChange={handleInputChange}
            type="number"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon />
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
            disabled={loading}
          />
        </Box>

        {/* Note */}
        <Alert
          icon={<InfoIcon />}
          severity="info"
          sx={{
            borderRadius: 2,
            backgroundColor: "#e8f4fc",
            color: "#2c3e50",
            "& .MuiAlert-icon": {
              color: "#62A1BA",
            },
          }}
        >
          <Typography variant="body2">
            La tua offerta sarà inviata al venditore per la revisione. Riceverai
            una notifica non appena verrà presa una decisione.
          </Typography>
        </Alert>
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          borderTop: "1px solid #e0e0e0",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Button
          onClick={handleClose}
          disabled={loading}
          sx={{
            color: "#62A1BA",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "rgba(98, 161, 186, 0.08)",
            },
          }}
        >
          Annulla
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          startIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <TrendingUpIcon />
            )
          }
          sx={{
            backgroundColor: "#62A1BA",
            fontWeight: 600,
            borderRadius: 2,
            px: 3,
            py: 1,
            "&:hover": {
              backgroundColor: "#4a8ba3",
            },
            "&.Mui-disabled": {
              backgroundColor: "#cccccc",
              color: "#666666",
            },
          }}
        >
          {loading ? "Invio in corso..." : "Invia Offerta"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MakeOfferModal;
