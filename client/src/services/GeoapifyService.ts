const API_KEY_GEOAPIFY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export async function fetchGeoapifyLocations(query: string) {
  if (!query.trim() || !API_KEY_GEOAPIFY) {
    return [];
  }

  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
    query,
  )}&limit=5&lang=it&filter=countrycode:it&apiKey=${API_KEY_GEOAPIFY}`;

  const response = await fetch(url);
  const data = await response.json();

  // Geoapify usa GeoJSON format con 'features' non 'results'
  return data.features || [];
}
