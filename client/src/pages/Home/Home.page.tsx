import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../../shared/components/Hero/Hero";
import ListingsSection from "../../shared/components/ListingsSection/ListingsSection";
import { Location } from "../../shared/models/Location.model";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = (): void => {
    const trimmed = query.trim();
    const params = new URLSearchParams();
    if (trimmed) {
      params.set("city", trimmed);
    }
    const queryString = params.toString();
    navigate(`/search-estates${queryString ? `?${queryString}` : ""}`);
  };

  const handleLocationSelect = (location: Location): void => {
    const params = new URLSearchParams();
    if (location.city) {
      params.set("city", location.city);
    }
    params.set("lat", location.lat.toString());
    params.set("lon", location.lon.toString());
    navigate(`/search-estates?${params.toString()}`);
  };

  return (
    <>
      <Hero
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        onLocationSelect={handleLocationSelect}
      />
      <ListingsSection />
    </>
  );
}
