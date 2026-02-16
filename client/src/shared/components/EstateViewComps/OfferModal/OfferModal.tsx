import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CounterOfferModal from "./CounterOfferModal";
import ExternalOfferModal from "./ExternalOfferModal";
import OfferHistorySection from "./OfferModalSections/OfferHistorySection";
import YourOfferSection from "./OfferModalSections/YourOfferSection";
import ModalActionsSection from "./OfferModalSections/ModalActionSection";
import EstatePriceSection from "./OfferModalSections/EstatePriceSection";
import { useOfferModal } from "../../../hooks/useOfferModal";

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
  const {
    offerPrice,
    setOfferPrice,
    offers,
    isManagerOrAgent,
    currentUserId,
    canManageEstateOffers,
    submitting,
    statusUpdatingId,
    counterStatusUpdatingId,
    isOfferValid,
    handleSubmit,
    handleStatusChange,
    handleOpenCounterOffer,
    handleCounterStatusChange,
    handleClose,
    counterOfferOpen,
    handleCloseCounterOffer,
    handleSubmitCounterOffer,
    counterSubmitting,
    externalOfferOpen,
    handleOpenExternalOffer,
    handleCloseExternalOffer,
    handleSubmitExternalOffer,
    externalSubmitting,
  } = useOfferModal({
    open,
    estateId,
    estatePrice,
    estateAgencyId,
    onSubmit,
    onClose,
  });

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
