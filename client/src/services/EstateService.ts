import { API } from "../shared/axios/Interceptors";
import { SearchParams } from "../shared/models/SearchParams.model";

export function searchEstates(params?: SearchParams) {
  return API.get("/real-estates/search", {
    params: {
      ...params?.filters,
      page: params?.page,
      limit: params?.limit,
      orderBy: params?.orderBy,
    },
  });
}

export function getEstatesByAgency(
  agencyId: number,
  params?: {
    page?: number;
    limit?: number;
    orderBy?: string;
  },
) {
  return API.get(`/real-estates/agency/${agencyId}`, {
    params: {
      page: params?.page,
      limit: params?.limit,
      orderBy: params?.orderBy,
    },
  });
}
