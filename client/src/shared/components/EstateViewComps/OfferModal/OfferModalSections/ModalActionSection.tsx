import { DialogActions, Button } from "@mui/material";

type ModalActionsSectionProps = {
  isManagerOrAgent: boolean;
  canManageEstateOffers: boolean;
  isOfferValid: boolean;
  submitting: boolean;
  onClose: () => void;
  onOpenExternalOffer: () => void;
  onSubmit: () => void;
};

export default function ModalActionsSection({
  isManagerOrAgent,
  canManageEstateOffers,
  isOfferValid,
  submitting,
  onClose,
  onOpenExternalOffer,
  onSubmit,
}: ModalActionsSectionProps) {
  return (
    <DialogActions
      sx={{
        p: 2,
        borderTop: "1px solid #e0e0e0",
        gap: 1,
      }}
    >
      <Button
        onClick={onClose}
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
          onClick={onOpenExternalOffer}
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
          onClick={onSubmit}
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
  );
}
