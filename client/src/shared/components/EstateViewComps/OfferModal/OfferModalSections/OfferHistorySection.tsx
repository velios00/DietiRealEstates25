import { Box, Typography, Button } from "@mui/material";
import { Offer } from "../../../../models/Offer.model";
import OfferCard from "../OfferCard";

type OfferHistorySectionProps = {
  offers: Offer[];
  isManagerOrAgent: boolean;
  canManageEstateOffers: boolean;
  currentUserId?: string | number;
  statusUpdatingId: number | null;
  counterStatusUpdatingId: number | null;
  onOpenCounterOffer: (idOffer: number) => void;
  onStatusChange: (idOffer: number, status: "accepted" | "rejected") => void;
  onCounterStatusChange: (
    idOffer: number,
    status: "accepted" | "rejected",
  ) => void;
};

export default function OfferHistorySection({
  offers,
  isManagerOrAgent,
  canManageEstateOffers,
  currentUserId,
  statusUpdatingId,
  counterStatusUpdatingId,
  onOpenCounterOffer,
  onStatusChange,
  onCounterStatusChange,
}: OfferHistorySectionProps) {
  const filteredOffers = isManagerOrAgent
    ? offers
    : offers.filter(
        (offer) =>
          currentUserId !== undefined && offer.idUser === Number(currentUserId),
      );

  return (
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
        filteredOffers.map((offer) => (
          <Box
            key={offer.idOffer}
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <Box sx={{ flex: 1 }}>
              <OfferCard offer={offer} isManagerOrAgent={isManagerOrAgent} />
            </Box>
            {canManageEstateOffers && offer.status === "pending" && (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  disabled={statusUpdatingId === offer.idOffer}
                  onClick={() => onOpenCounterOffer(offer.idOffer)}
                  sx={{ textTransform: "none" }}
                >
                  Controfferta
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  disabled={statusUpdatingId === offer.idOffer}
                  onClick={() => onStatusChange(offer.idOffer, "rejected")}
                  sx={{ textTransform: "none" }}
                >
                  Rifiuta
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  disabled={statusUpdatingId === offer.idOffer}
                  onClick={() => onStatusChange(offer.idOffer, "accepted")}
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
                    onCounterStatusChange(offer.idOffer, "rejected")
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
                    onCounterStatusChange(offer.idOffer, "accepted")
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
  );
}
