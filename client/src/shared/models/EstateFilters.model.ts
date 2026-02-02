export interface EstateFilters {
  type?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  nRooms?: number;
  minBeds?: number;
  nBathrooms?: number;
  minSize?: number;
  maxSize?: number;
  floor?: number;
  energyClass?: string;
  idAgency?: number;
  lat?: number;
  lon?: number;
  radius?: number;
}
