import { EstateFilters } from "./EstateFilters.model";

export interface SearchParams {
  filters?: EstateFilters;
  page?: number;
  limit?: number;
  orderBy?: "createdAt" | "price";
}
