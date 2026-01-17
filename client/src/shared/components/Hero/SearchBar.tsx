import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onOpenFilters: () => void;
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  onOpenFilters,
}: SearchBarProps) {
  return (
    <div className="search-bar">
      <button onClick={onOpenFilters}>☰</button>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cerca comune o indirizzo"
      />

      <button onClick={onSearch}>🔍</button>
    </div>
  );
}
