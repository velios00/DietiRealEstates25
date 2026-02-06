import { Chip, Typography, Box } from "@mui/material";
import { Offer } from "../../../models/Offer.model";

interface OfferCardProps {
  offer: Offer;
  isManagerOrAgent: boolean;
}

const getStatusLabel = (status: Offer["status"]) => {
  switch (status) {
    case "pending":
      return "In Attesa";
    case "accepted":
      return "Accettata";
    case "rejected":
      return "Rifiutata";
    case "countered":
      return "Controfferta";
    default:
      return status;
  }
};

const getStatusColor = (status: Offer["status"]) => {
  switch (status) {
    case "pending":
      return "warning";
    case "accepted":
      return "success";
    case "rejected":
      return "error";
    case "countered":
      return "info";
    default:
      return "default";
  }
};

export default function OfferCard({ offer, isManagerOrAgent }: OfferCardProps) {
  const offererName =
    `${offer.userName ?? "Utente"} ${offer.userSurname ?? ""}`.trim();

  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid #62A1BA",
        display: "flex",
        alignItems: "center",
        gap: 2,
        px: 2,
        py: 1.5,
        bgcolor: "transparent",
      }}
    >
      <Box sx={{ flex: 1 }}>
        {isManagerOrAgent ? (
          <Typography sx={{ fontWeight: 500 }}>
            <Box component="span" sx={{ fontWeight: 700 }}>
              {offererName}
            </Box>{" "}
            ha offerto{" "}
            <Box component="span" sx={{ fontWeight: 700 }}>
              {offer.amount.toLocaleString("it-IT")} €
            </Box>
          </Typography>
        ) : (
          <Typography sx={{ fontWeight: 500 }}>
            Hai offerto{" "}
            <Box component="span" sx={{ fontWeight: 700 }}>
              {offer.amount.toLocaleString("it-IT")} €
            </Box>
            {offer.status === "countered" &&
              offer.counterOfferAmount !== undefined && (
                <>
                  {" "}
                  - Controfferta{" "}
                  <Box component="span" sx={{ fontWeight: 700 }}>
                    {offer.counterOfferAmount.toLocaleString("it-IT")} €
                  </Box>
                </>
              )}
          </Typography>
        )}
      </Box>
      <Chip
        label={getStatusLabel(offer.status)}
        color={getStatusColor(offer.status)}
        size="small"
        variant="outlined"
      />
    </Box>
  );
}
