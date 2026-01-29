import { useState, useCallback } from "react";
import { Location } from "../models/Location.model";
import { fetchGeoapifyLocations } from "../../services/GeoapifyService";

export function useLocationSearch() {
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const rawResults = await fetchGeoapifyLocations(query);

      // Geoapify usa GeoJSON format
      const locations: Location[] = rawResults.map(
        (feature: {
          properties: {
            city?: string;
            address_line1?: string;
            formatted?: string;
          };
          geometry: {
            coordinates: [number, number]; // [lon, lat]
          };
        }) => ({
          city: feature.properties.city || "",
          address:
            feature.properties.address_line1 ||
            feature.properties.formatted ||
            query,
          lat: feature.geometry.coordinates[1], // GeoJSON usa [lon, lat]
          lon: feature.geometry.coordinates[0],
        }),
      );

      setSuggestions(locations);
    } catch (error) {
      console.error("❌ Errore nella ricerca delle location:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setSuggestions([]);
  }, []);

  return {
    suggestions,
    loading,
    search,
    clear,
  };
}
