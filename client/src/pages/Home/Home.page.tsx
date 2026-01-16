import { useState } from "react";
import Header from "../../shared/layout/Header";
import HeroSection from "../../shared/components/Hero/HeroSection";
import ListingsSection from "../../shared/listings/ListingsSection";
import React from "react";

export default function Home(): React.JSX.Element {
  const [query, setQuery] = useState<string>("");

  const handleSearch = (): void => {
    console.log("Ricerca:", query);
  };

  return (
    <>
      <Header />
      <HeroSection query={query} setQuery={setQuery} onSearch={handleSearch} />
      <ListingsSection />
    </>
  );
}
