import { API } from "../shared/axios/Interceptors";
import { User } from "../shared/models/User.model";

export function getUserById(idUser: string) {
  return API.get(`/users/${idUser}`);
}
