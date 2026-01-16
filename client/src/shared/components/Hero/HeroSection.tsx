import React from "react";
import SearchBar from "./SearchBar";

interface HeroSectionProps {
  query: string;
  setQuery: (value: string) => void;
  onSearch: () => void;
}

export default function HeroSection({
  query,
  setQuery,
  onSearch,
}: HeroSectionProps): React.JSX.Element {
  return (
    <section className="hero">
      <h2>Trova la casa che fa per te</h2>
      <p>È facile trovare la casa dei tuoi sogni.</p>

      <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={onSearch}
        onOpenFilters={() => {}}
      />
    </section>
  );
}
