import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EstateCard, {
  Listing,
} from "../../../shared/components/EstateCard/EstateCard";
import { searchEstates } from "../../../services/EstateService";
import { mapEstateToListing } from "../../../mappers/EstateToListing.mapper";
import { Estate } from "../../models/Estate.model";

export default function SearchResults() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);

  useEffect(() => {
    searchEstates({
      page: 1,
      limit: 12,
      orderBy: "createdAt",
    })
      .then((response) => {
        console.log("Response from searchEstates:", response);
        const estates: Estate[] = response.data.results;
        const mapped = estates.map(mapEstateToListing);
        setListings(mapped);
        setTotalResults(response.data.total || estates.length);
      })
      .catch((error) => {
        console.error("Errore durante il recupero degli annunci:", error);
      });
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header risultati */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#2c3e50",
            mb: 1,
          }}
        >
          Immobili trovati
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#7f8c8d",
            fontSize: "1.1rem",
          }}
        >
          {totalResults} risultati
        </Typography>
      </Box>

      {/* Lista verticale di annunci */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {listings.map((listing) => (
          <Box key={listing.id} sx={{ width: "100%" }}>
            <EstateCard listing={listing} />
          </Box>
        ))}
      </Box>

      {/* Paginazione (da implementare) */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        {/* Qui puoi aggiungere la paginazione in seguito */}
      </Box>
    </Box>
  );
}
