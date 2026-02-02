import { useCallback, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getOffersByRealEstateId } from "../../../../services/OfferService";
import { Offer } from "../../../models/Offer.model";

interface OfferModalProps {
  open: boolean;
  onClose: () => void;
  estateId: number;
  estatePrice: number;
  onSubmit: (offerPrice: number) => void;
}

export default function OfferModal({
  open,
  onClose,
  estateId,
  estatePrice,
  onSubmit,
}: OfferModalProps) {
  const [offerPrice, setOfferPrice] = useState<string>("");
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (offerPrice && !isNaN(parseFloat(offerPrice))) {
      onSubmit(parseFloat(offerPrice));
      setOfferPrice("");
    }
  };

  const fetchOffers = useCallback(() => {
    if (!estateId) return;

    setLoading(true);
    getOffersByRealEstateId(estateId)
      .then((response) => {
        setOffers(response.data);
      })
      .catch((error) => {
        console.error("Errore nel recupero delle offerte:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [estateId]);

  useEffect(() => {
    if (open && estateId) {
      fetchOffers();
    }
  }, [open, estateId, fetchOffers]);

  const handleClose = () => {
    setOfferPrice("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2,
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e0e0e0",
          pb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Proponi Offerta
        </Typography>
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            color: "text.secondary",
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        {/* Prezzo di partenza */}
        <Box sx={{ mb: 4, textAlign: "center", mt: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#62A1BA",
              mb: 0.5,
            }}
          >
            ${estatePrice.toLocaleString("it-IT")}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#999",
              fontSize: "0.9rem",
            }}
          >
            Prezzo di partenza
          </Typography>
        </Box>

        {/* Storico Offerte */}
        {offers && offers.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle2"
              sx={{
                textAlign: "center",
                fontWeight: 600,
                color: "#62A1BA",
                mb: 2,
              }}
            >
              Storico Offerte
            </Typography>
            <TableContainer
              sx={{
                borderRadius: 1,
                border: "1px solid #e0e0e0",
                maxHeight: 300,
              }}
            >
              <Table size="small" stickyHeader>
                <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, fontSize: "0.85rem" }}>
                      Utente
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: 600, fontSize: "0.85rem" }}
                    >
                      Importo
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: "0.85rem" }}>
                      Stato
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {offers.map((offer) => (
                    <TableRow key={offer.idOffer}>
                      <TableCell sx={{ fontSize: "0.9rem" }}>
                        {offer.userName} {offer.userSurname}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: "0.9rem" }}>
                        ${offer.amount.toLocaleString("it-IT")}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            offer.status === "pending"
                              ? "In Attesa"
                              : offer.status === "accepted"
                                ? "Accettata"
                                : offer.status === "rejected"
                                  ? "Rifiutata"
                                  : "Controrapposta"
                          }
                          size="small"
                          variant="outlined"
                          sx={{
                            bgcolor:
                              offer.status === "pending"
                                ? "#fff3e0"
                                : offer.status === "accepted"
                                  ? "#e8f5e9"
                                  : offer.status === "rejected"
                                    ? "#ffebee"
                                    : "#e3f2fd",
                            borderColor:
                              offer.status === "pending"
                                ? "#ff9800"
                                : offer.status === "accepted"
                                  ? "#4caf50"
                                  : offer.status === "rejected"
                                    ? "#f44336"
                                    : "#2196f3",
                            color:
                              offer.status === "pending"
                                ? "#ff9800"
                                : offer.status === "accepted"
                                  ? "#4caf50"
                                  : offer.status === "rejected"
                                    ? "#f44336"
                                    : "#2196f3",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Sezione offerta */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: "#62A1BA",
              mb: 2,
              textAlign: "center",
            }}
          >
            La tua Offerta
          </Typography>

          <TextField
            fullWidth
            type="number"
            value={offerPrice}
            onChange={(e) => setOfferPrice(e.target.value)}
            placeholder="Inserisci il tuo prezzo"
            slotProps={{
              input: {
                inputProps: {
                  step: "1000",
                  min: "0",
                },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                fontSize: "1.6rem",
                fontWeight: 600,
                textAlign: "center",
                "& input": {
                  textAlign: "center",
                },
                "&:hover fieldset": {
                  borderColor: "#4a90a4",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#4a90a4",
                },
              },
            }}
          />
        </Box>

        {/* Messaggio informativo */}
        {offerPrice && !isNaN(parseFloat(offerPrice)) && (
          <Typography
            variant="caption"
            sx={{
              color:
                parseFloat(offerPrice) >= estatePrice ? "#4caf50" : "#ff9800",
              display: "block",
              textAlign: "center",
            }}
          >
            {parseFloat(offerPrice) >= estatePrice
              ? "Offerta idonea"
              : "Offerta inferiore al prezzo di partenza"}
          </Typography>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          p: 2,
          borderTop: "1px solid #e0e0e0",
          gap: 1,
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            color: "#666",
            textTransform: "none",
            fontSize: "1rem",
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          Annulla
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!offerPrice || isNaN(parseFloat(offerPrice))}
          sx={{
            bgcolor: "#4a90a4",
            textTransform: "none",
            fontSize: "1rem",
            borderRadius: 2,
            px: 3,
            "&:hover": {
              bgcolor: "#3a7a94",
            },
            "&:disabled": {
              bgcolor: "#ddd",
              color: "#999",
            },
          }}
        >
          Proponi Offerta
        </Button>
      </DialogActions>
    </Dialog>
  );
}
