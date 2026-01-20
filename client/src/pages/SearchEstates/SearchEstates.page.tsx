import Header from "../../shared/components/Header/Header";
import EstatesPageLayout from "../../shared/components/EstatesPageLayout/EstatesPageLayout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FiltersButton } from "../../shared/components/FiltersButton/FiltersButton";
import { SearchBar } from "../../shared/components/SearchBar/SearchBar";
import EstateCard from "../../shared/components/EstateCard/EstateCard";

export default function SearchEstatesPage() {
  // TODO: stato ricerca / filtri / fetch
  const estates = [1, 2, 3, 4, 5]; // mock

  return (
    <EstatesPageLayout
      topSection={
        <Box sx={{ display: "flex", gap: 2 }}>
          <SearchBar />
          <FiltersButton />
        </Box>
      }
      listSection={
        <>
          <Typography fontWeight={600} mb={2}>
            Immobili trovati ({estates.length})
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {estates.map((id) => (
              <EstateCard key={id} listing={undefined} />
            ))}
          </Box>
        </>
      }
      mapSection={<MapView estates={estates} />}
    />
  );
}
