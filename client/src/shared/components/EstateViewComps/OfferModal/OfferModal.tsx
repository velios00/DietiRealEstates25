import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  getOffersByRealEstateId,
  createCounterOffer,
  updateCounterOfferStatus,
  updateOfferStatus,
  createExternalOffer,
} from "../../../../services/OfferService";
import { getUserAgencyId } from "../../../../services/UserService";
import { Offer } from "../../../models/Offer.model";
import OfferCard from "./OfferCard";
import CounterOfferModal from "./CounterOfferModal";
import ExternalOfferModal from "./ExternalOfferModal";
import { Roles } from "../../../enums/Roles.enum";
import { useUser } from "../../../hooks/useUser";
import toast from "react-hot-toast";

interface OfferModalProps {
  open: boolean;
  onClose: () => void;
  estateId: number;
  estatePrice: number;
  onSubmit: (offerPrice: number) => Promise<void>;
  estateAgencyId?: number;
}

export default function OfferModal({
  open,
  onClose,
  estateId,
  estatePrice,
  onSubmit,
  estateAgencyId,
}: OfferModalProps) {
  const userContext = useUser();
  const navigate = useNavigate();
  const isManagerOrAgent =
    userContext?.role === Roles.MANAGER || userContext?.role === Roles.AGENT;
  const currentUserId = userContext?.user?.idUser;
  const [offerPrice, setOfferPrice] = useState<string>("");
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(false);
  const [externalOfferOpen, setExternalOfferOpen] = useState(false);
  const [externalSubmitting, setExternalSubmitting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusUpdatingId, setStatusUpdatingId] = useState<number | null>(null);
  const [counterOfferOpen, setCounterOfferOpen] = useState(false);
  const [counterOfferId, setCounterOfferId] = useState<number | null>(null);
  const [counterSubmitting, setCounterSubmitting] = useState(false);
  const [counterStatusUpdatingId, setCounterStatusUpdatingId] = useState<
    number | null
  >(null);
  const [userAgencyId, setUserAgencyId] = useState<number | null>(null);

  const canManageEstateOffers =
    isManagerOrAgent &&
    userAgencyId !== null &&
    estateAgencyId !== undefined &&
    userAgencyId === estateAgencyId;

  useEffect(() => {
    const fetchAgencyId = async () => {
      if (!isManagerOrAgent || !currentUserId) {
        setUserAgencyId(null);
        return;
      }

      try {
        const response = await getUserAgencyId(Number(currentUserId));
        const agencyId = response.data?.idAgency;
        setUserAgencyId(
          agencyId !== undefined && agencyId !== null ? Number(agencyId) : null,
        );
      } catch (error) {
        console.error("Errore nel recupero dell'agenzia utente:", error);
        setUserAgencyId(null);
      }
    };

    fetchAgencyId();
  }, [isManagerOrAgent, currentUserId]);

  const validateOffer = (price: number): boolean => {
    if (price <= 0) {
      toast.error("L'offerta deve essere maggiore di 0");
      return false;
    }

    if (price > estatePrice) {
      toast.error("L'offerta deve essere inferiore al prezzo di partenza");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!userContext?.user) {
      toast.error("Devi accedere per proporre un'offerta.");
      handleClose();
      navigate("/login");
      return;
    }

    if (!offerPrice || isNaN(parseFloat(offerPrice))) {
      toast.error("Inserisci un importo valido");
      return;
    }

    const price = parseFloat(offerPrice);

    // Validazione lato client
    if (!validateOffer(price)) {
      return;
    }

    setSubmitting(true);

    try {
      await onSubmit(price);
      toast.success("Offerta proposta con successo.");
      setOfferPrice("");
      toast.success("Offerta inviata con successo!");
      // Ricarica le offerte per mostrare quella appena creata
      await fetchOffers();
    } catch (error: any) {
      console.error("Errore nell'invio dell'offerta:", error);
      // Gestione errori specifici dal backend
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Errore nell'invio dell'offerta. Riprova.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (
    idOffer: number,
    status: "accepted" | "rejected",
  ) => {
    if (!canManageEstateOffers) {
      toast.error("Non puoi gestire offerte di immobili di altre agenzie.");
      return;
    }

    setStatusUpdatingId(idOffer);
    try {
      await updateOfferStatus(idOffer, { status });
      toast.success(
        status === "accepted" ? "Offerta accettata." : "Offerta rifiutata.",
      );
      await fetchOffers();
    } catch (error) {
      console.error("Errore nell'aggiornamento dell'offerta:", error);
      toast.error("Errore nell'aggiornamento dell'offerta. Riprova.");
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const handleOpenCounterOffer = (idOffer: number) => {
    if (!canManageEstateOffers) {
      toast.error("Non puoi gestire offerte di immobili di altre agenzie.");
      return;
    }
    setCounterOfferId(idOffer);
    setCounterOfferOpen(true);
  };

  const handleCloseCounterOffer = () => {
    setCounterOfferOpen(false);
    setCounterOfferId(null);
  };

  const handleSubmitCounterOffer = async (amount: number) => {
    if (!counterOfferId) return;
    if (!canManageEstateOffers) {
      toast.error("Non puoi gestire offerte di immobili di altre agenzie.");
      return;
    }

    setCounterSubmitting(true);
    try {
      await createCounterOffer(counterOfferId, { counterAmount: amount });
      toast.success("Controfferta inviata.");
      handleCloseCounterOffer();
      await fetchOffers();
    } catch (error) {
      console.error("Errore nell'invio della controfferta:", error);
      toast.error("Errore nell'invio della controfferta. Riprova.");
    } finally {
      setCounterSubmitting(false);
    }
  };

  const handleCounterStatusChange = async (
    idOffer: number,
    status: "accepted" | "rejected",
  ) => {
    if (isManagerOrAgent) return;

    setCounterStatusUpdatingId(idOffer);
    try {
      await updateCounterOfferStatus(idOffer, { status });
      toast.success(
        status === "accepted"
          ? "Controfferta accettata."
          : "Controfferta rifiutata.",
      );
      await fetchOffers();
    } catch (error) {
      console.error("Errore nell'aggiornamento della controfferta:", error);
      toast.error("Errore nell'aggiornamento della controfferta. Riprova.");
    } finally {
      setCounterStatusUpdatingId(null);
    }
  };

  const handleOpenExternalOffer = () => {
    if (!canManageEstateOffers) return;
    setExternalOfferOpen(true);
  };

  const handleCloseExternalOffer = () => {
    setExternalOfferOpen(false);
  };

  const handleSubmitExternalOffer = async (amount: number) => {
    if (!isManagerOrAgent) return;

    setExternalSubmitting(true);
    try {
      await createExternalOffer({
        idRealEstate: estateId,
        amount,
        inSistem: false,
      });
      toast.success("Offerta esterna registrata con successo.");
      handleCloseExternalOffer();
      await fetchOffers();
    } catch (error) {
      console.error("Errore nella registrazione dell'offerta esterna:", error);
      toast.error("Errore nella registrazione dell'offerta esterna. Riprova.");
    } finally {
      setExternalSubmitting(false);
    }
  };

  const fetchOffers = useCallback(async () => {
    if (!estateId) return;

    setLoading(true);
    try {
      const response = await getOffersByRealEstateId(estateId);
      setOffers(response.data);
    } catch (error) {
      console.error("Errore nel recupero delle offerte:", error);
    } finally {
      setLoading(false);
    }
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

  // Calcola se l'offerta è valida per lo stato del pulsante
  const parsedOfferPrice = parseFloat(offerPrice);
  const isOfferValid =
    offerPrice &&
    !isNaN(parsedOfferPrice) &&
    parsedOfferPrice > 0 &&
    parsedOfferPrice <= estatePrice;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      scroll="paper"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            maxHeight: "90vh",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
          px: 3,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#333",
          }}
        >
          Gestione Offerte
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          flex: "1 1 auto",
          overflowY: "auto",
          p: 3,
        }}
      >
        {/* Info Prezzo */}
        <Box
          sx={{
            mb: 3,
            p: 2,
            bgcolor: "#f9f9f9",
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
            Prezzo Immobile
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#62A1BA",
            }}
          >
            {estatePrice.toLocaleString("it-IT")} €
          </Typography>
        </Box>

        {/* Storico offerte */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle2"
            sx={{
              textAlign: "center",
              fontWeight: 600,
              color: "#62A1BA",
              mb: 1,
            }}
          >
            Storico Offerte
          </Typography>
          {offers && offers.length > 0 ? (
            (isManagerOrAgent
              ? offers
              : offers.filter(
                  (offer) =>
                    currentUserId !== undefined &&
                    offer.idUser === Number(currentUserId),
                )
            ).map((offer) => (
              <Box
                key={offer.idOffer}
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <Box sx={{ flex: 1 }}>
                  <OfferCard
                    offer={offer}
                    isManagerOrAgent={isManagerOrAgent}
                  />
                </Box>
                {canManageEstateOffers && offer.status === "pending" && (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      disabled={statusUpdatingId === offer.idOffer}
                      onClick={() => handleOpenCounterOffer(offer.idOffer)}
                      sx={{ textTransform: "none" }}
                    >
                      Controfferta
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      disabled={statusUpdatingId === offer.idOffer}
                      onClick={() =>
                        handleStatusChange(offer.idOffer, "rejected")
                      }
                      sx={{ textTransform: "none" }}
                    >
                      Rifiuta
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      disabled={statusUpdatingId === offer.idOffer}
                      onClick={() =>
                        handleStatusChange(offer.idOffer, "accepted")
                      }
                      sx={{ textTransform: "none" }}
                    >
                      Accetta
                    </Button>
                  </Box>
                )}
                {!isManagerOrAgent && offer.status === "countered" && (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      disabled={counterStatusUpdatingId === offer.idOffer}
                      onClick={() =>
                        handleCounterStatusChange(offer.idOffer, "rejected")
                      }
                      sx={{ textTransform: "none" }}
                    >
                      Rifiuta
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      disabled={counterStatusUpdatingId === offer.idOffer}
                      onClick={() =>
                        handleCounterStatusChange(offer.idOffer, "accepted")
                      }
                      sx={{ textTransform: "none" }}
                    >
                      Accetta
                    </Button>
                  </Box>
                )}
              </Box>
            ))
          ) : (
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "#999",
                py: 2,
              }}
            >
              Nessuna offerta
            </Typography>
          )}
        </Box>

        {!isManagerOrAgent && (
          <>
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

            {/* Messaggio informativo con validazione visiva */}
            {offerPrice && !isNaN(parsedOfferPrice) && (
              <Typography
                variant="caption"
                sx={{
                  color: isOfferValid ? "#4caf50" : "#f44336",
                  display: "block",
                  textAlign: "center",
                  fontWeight: 500,
                }}
              >
                {parsedOfferPrice <= 0
                  ? "L'offerta deve essere maggiore di 0"
                  : parsedOfferPrice > estatePrice
                    ? "L'offerta deve essere inferiore al prezzo di partenza"
                    : "Offerta valida"}
              </Typography>
            )}
          </>
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
        {canManageEstateOffers && (
          <Button
            onClick={handleOpenExternalOffer}
            variant="contained"
            sx={{
              bgcolor: "#62A1BA",
              textTransform: "none",
              fontSize: "1rem",
              borderRadius: 2,
              px: 3,
              "&:hover": {
                bgcolor: "#4a90a4",
              },
            }}
          >
            Registra Offerta Esterna
          </Button>
        )}
        {!isManagerOrAgent && (
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!isOfferValid || submitting}
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
            {submitting ? "Invio..." : "Proponi Offerta"}
          </Button>
        )}
      </DialogActions>
      <CounterOfferModal
        open={counterOfferOpen}
        onClose={handleCloseCounterOffer}
        onSubmit={handleSubmitCounterOffer}
        submitting={counterSubmitting}
        minAmount={estatePrice}
      />
      <ExternalOfferModal
        open={externalOfferOpen}
        onClose={handleCloseExternalOffer}
        onSubmit={handleSubmitExternalOffer}
        submitting={externalSubmitting}
        maxPrice={estatePrice}
      />
    </Dialog>
  );
}
