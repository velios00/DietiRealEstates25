import { API } from "../shared/axios/Interceptors";

export function getAgencyById(idAgency: string) {
  return API.get(`/agency/${idAgency}`);
}
