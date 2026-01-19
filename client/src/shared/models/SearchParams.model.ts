import { EstateFilters } from "./EstateFilters";

export interface SearchParams {
  filters?: EstateFilters;
  page?: number;
  limit?: number;
  orderBy?: "createdAt" | "price";
}
