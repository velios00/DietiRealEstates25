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

// export function getEstatesByAgency(
//   idAgency: number,
//   params?: {
//     page?: number;
//     limit?: number;
//     orderBy?: "createdAt" | "price";
//   },
// ) {
//   // Use searchEstates with idAgency filter
//   return searchEstates({
//     filters: { idAgency: idAgency },
//     page: params?.page,
//     limit: params?.limit,
//     orderBy: params?.orderBy,
//   });
// }
export function getEstateById(id: string | number) {
  return API.get(`/real-estates/${id}`);
}

export function createEstate(estateData: FormData) {
  return API.post(`/real-estates/create`, estateData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function getMyEstates(params?: {
  page?: number;
  limit?: number;
  orderBy?: "createdAt" | "price";
}) {
  return API.get("/real-estates/my-estates", {
    params: {
      page: params?.page,
      limit: params?.limit,
      orderBy: params?.orderBy,
    },
  });
}
