import { API } from "../shared/axios/Interceptors";

export function getUserById(idUser: string) {
  return API.get(`/users/${idUser}`);
}
