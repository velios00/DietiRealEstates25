import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../../shared/components/Hero/Hero";
import ListingsSection from "../../shared/components/ListingsSection/ListingsSection";
import { Box } from "@mui/material";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = (): void => {
    const trimmed = query.trim();
    navigate("/search-estates", { state: { query: trimmed } });
  };

  return (
    <>
      <Box sx={{ height: "64px" }}>
        <Hero query={query} setQuery={setQuery} onSearch={handleSearch} />
        <ListingsSection />
      </Box>
    </>
  );
}
