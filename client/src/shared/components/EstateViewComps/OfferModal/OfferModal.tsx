import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
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
import CounterOfferModal from "./CounterOfferModal";
import ExternalOfferModal from "./ExternalOfferModal";
import EstatePriceSection from "./OfferModalSections/EstatePriceSection";
import ModalActionsSection from "./OfferModalSections/ModalActionSection";
import OfferHistorySection from "./OfferModalSections/OfferHistorySection";
import YourOfferSection from "./OfferModalSections/YourOfferSection";
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
  const [loading, setLoading] = useState(false); //ocho
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <EstatePriceSection estatePrice={estatePrice} />
        <OfferHistorySection
          offers={offers}
          isManagerOrAgent={isManagerOrAgent}
          canManageEstateOffers={canManageEstateOffers}
          currentUserId={currentUserId}
          statusUpdatingId={statusUpdatingId}
          counterStatusUpdatingId={counterStatusUpdatingId}
          onOpenCounterOffer={handleOpenCounterOffer}
          onStatusChange={handleStatusChange}
          onCounterStatusChange={handleCounterStatusChange}
        />
        {!isManagerOrAgent && (
          <YourOfferSection
            offerPrice={offerPrice}
            estatePrice={estatePrice}
            onOfferPriceChange={setOfferPrice}
          />
        )}
      </DialogContent>
      <ModalActionsSection
        isManagerOrAgent={isManagerOrAgent}
        canManageEstateOffers={canManageEstateOffers}
        isOfferValid={isOfferValid}
        submitting={submitting}
        onClose={handleClose}
        onOpenExternalOffer={handleOpenExternalOffer}
        onSubmit={handleSubmit}
      />
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
