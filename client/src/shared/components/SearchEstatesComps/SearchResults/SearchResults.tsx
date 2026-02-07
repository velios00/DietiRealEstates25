import {
  Box,
  CircularProgress,
  Divider,
  Pagination,
  Typography,
} from "@mui/material";
import EstateCard, { Listing } from "../../EstateCard/EstateCard";

interface SearchResultsProps {
  listings: Listing[];
  totalResults: number;
  loading: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function SearchResults(props: SearchResultsProps) {
  const totalPages = Math.ceil(props.totalResults / 12);

  if (props.loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress sx={{ color: "#62A1BA" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
            textAlign: "center",
          }}
        >
          {props.totalResults} risultati
        </Typography>
      </Box>
      <Divider sx={{ width: "100%", mb: 4 }} />
      {/* Lista verticale di annunci */}
      {props.listings.length === 0 ? (
        <Typography sx={{ textAlign: "center" }}>
          Nessun risultato trovato
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {props.listings.map((listing) => (
            <Box key={listing.id} sx={{ width: "100%" }}>
              <EstateCard listing={listing} />
            </Box>
          ))}
        </Box>
      )}

      {totalPages > 1 && (
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={totalPages}
            page={props.currentPage}
            onChange={(_, page) => props.onPageChange(page)}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                "&.Mui-selected": {
                  backgroundColor: "#62A1BA",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#4299b5",
                  },
                },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}
