import { useState } from "react";
import Header from "../../shared/components/Header/Header";
import Hero from "../../shared/components/Hero/Hero";
import ListingsSection from "../../shared/listings/ListingsSection";
import React from "react";
import { Box } from "@mui/material";
import EstateCard from "../../shared/components/EstateCard/EstateCard";

export default function Home() {
  const [query, setQuery] = useState<string>("");

  const handleSearch = (): void => {
    console.log("Ricerca:", query);
  };

  return (
    <>
      <Box sx={{ height: "64px" }}>
        <Header />
        <Hero query={query} setQuery={setQuery} onSearch={handleSearch} />
        <EstateCard />
        <ListingsSection />
        <EstateCard />
      </Box>
    </>
  );
}
