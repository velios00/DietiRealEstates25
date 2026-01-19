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
