import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getOffersByRealEstateId,
  createCounterOffer,
  updateCounterOfferStatus,
  updateOfferStatus,
  createExternalOffer,
} from "../../services/OfferService";
import { getUserAgencyId } from "../../services/UserService";
import { Offer } from "../models/Offer.model";
import { Roles } from "../enums/Roles.enum";
import { useUser } from "./useUser";
import toast from "react-hot-toast";

interface UseOfferModalProps {
  open: boolean;
  estateId: number;
  estatePrice: number;
  estateAgencyId?: number;
  onSubmit: (offerPrice: number) => Promise<void>;
  onClose: () => void;
}

export function useOfferModal({
  open,
  estateId,
  estatePrice,
  estateAgencyId,
  onSubmit,
  onClose,
}: UseOfferModalProps) {
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

    if (!validateOffer(price)) {
      return;
    }

    setSubmitting(true);

    try {
      await onSubmit(price);
      toast.success("Offerta proposta con successo.");
      setOfferPrice("");
      toast.success("Offerta inviata con successo!");
      await fetchOffers();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Errore nell'invio dell'offerta:", error);
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

  const handleClose = () => {
    setOfferPrice("");
    onClose();
  };

  const parsedOfferPrice = parseFloat(offerPrice);
  const isOfferValid =
    offerPrice &&
    !isNaN(parsedOfferPrice) &&
    parsedOfferPrice > 0 &&
    parsedOfferPrice <= estatePrice;

  return {
    offerPrice,
    setOfferPrice,
    offers,
    loading,
    isManagerOrAgent: isManagerOrAgent as boolean,
    currentUserId: currentUserId as string | number | undefined,
    canManageEstateOffers,
    submitting,
    statusUpdatingId,
    counterStatusUpdatingId,
    isOfferValid: isOfferValid as boolean,
    handleSubmit,
    handleStatusChange,
    handleOpenCounterOffer,
    handleCounterStatusChange,
    handleClose,
    // Counter offer modal
    counterOfferOpen,
    handleCloseCounterOffer,
    handleSubmitCounterOffer,
    counterSubmitting,
    // External offer modal
    externalOfferOpen,
    handleOpenExternalOffer,
    handleCloseExternalOffer,
    handleSubmitExternalOffer,
    externalSubmitting,
  };
}
