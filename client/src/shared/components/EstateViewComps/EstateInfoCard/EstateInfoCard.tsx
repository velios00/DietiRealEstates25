import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import { SquareFoot, Bed, Bathroom } from "@mui/icons-material";
import { Estate } from "../../../models/Estate.model";
import { Agency } from "../../../models/Agency.model";
import { cleanAddress } from "../../../../mappers/EstateToListing.mapper";
import { Roles } from "../../../enums/Roles.enum";
import { useUser } from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface EstateInfoCardProps {
  estate: Estate;
  agency: Agency;
  onOfferClick?: () => void;
}

export default function EstateInfoCard({
  estate,
  agency,
  onOfferClick,
}: EstateInfoCardProps) {
  const [imageError, setImageError] = useState(false);
  const { user, role } = useUser();
  const navigate = useNavigate();
  const canMakeOffer = user && role !== Roles.ADMIN;

  const handleOfferClick = () => {
    if (!canMakeOffer) {
      toast.error("Devi essere loggato per effettuare l'offerta");
      navigate("/login");
      return;
    }
    onOfferClick?.();
  };
  const handleAgencyNavigate = () => {
    if (agency?.idAgency) {
      navigate(`/agency/${agency.idAgency}`);
    }
  };
  const agencyInitials = agency.agencyName
    ? agency.agencyName
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("")
    : "A";

  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Header azzurro */}
      <Box
        sx={{
          bgcolor: "#62A1BA",
          color: "white",
          p: 2.5,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
          {estate.title}
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.9, fontSize: 16 }}>
          {estate.place?.address
            ? cleanAddress(`${estate.place.address}`)
            : estate.address}
        </Typography>
      </Box>

      <CardContent sx={{ p: 3 }}>
        {/* Dettagli proprietà */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            gap: 2,
            mb: 3,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <SquareFoot
              sx={{
                color: "#62A1BA",
                mb: 1,
                fontSize: "2rem",
              }}
            />
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#333" }}>
              {estate.size} mq
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Bed
              sx={{
                color: "#62A1BA",
                mb: 1,
                fontSize: "2rem",
              }}
            />
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#333" }}>
              {estate.nRooms} locali
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Bathroom
              sx={{
                color: "#62A1BA",
                mb: 1,
                fontSize: "2rem",
              }}
            />
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#333" }}>
              {estate.nBathrooms} bagni
            </Typography>
          </Box>
        </Box>

        {/* Prezzo */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#62A1BA",
              fontSize: "2.5rem",
            }}
          >
            {estate.price.toLocaleString()}$
          </Typography>
        </Box>

        {/* Button Proponi Offerta */}
        {role !== Roles.ADMIN && (
          <Button
            variant="contained"
            fullWidth
            onClick={handleOfferClick}
            sx={{
              bgcolor: "#62A1BA",
              color: "white",
              fontWeight: 600,
              py: 1.5,
              borderRadius: 2,
              mb: 3,
              "&:hover": { bgcolor: "#4a8aa3" },
            }}
          >
            Proponi Offerta
          </Button>
        )}

        {/* Info Agenzia */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            pt: 2,
            borderTop: "1px solid #e0e0e0",
          }}
        >
          {agency.profileImage && !imageError && (
            <Box
              component="img"
              src={agency.profileImage}
              alt={agency.agencyName}
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                bgcolor: "#52A875",
                display: "block",
                objectFit: "cover",
                mb: 1.5,
                cursor: "pointer",
              }}
              onError={() => setImageError(true)}
              onClick={handleAgencyNavigate}
            />
          )}
          {(!agency.profileImage || imageError) && (
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                bgcolor: "#52A875",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                fontSize: "1.5rem",
                mb: 1.5,
                cursor: "pointer",
              }}
              onClick={handleAgencyNavigate}
            >
              {agencyInitials}
            </Box>
          )}
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: "#333",
                mb: 0.5,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={handleAgencyNavigate}
            >
              {agency.agencyName}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#666", display: "block" }}
            >
              {agency.address}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#666", display: "block" }}
            >
              {agency.phoneNumber}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
