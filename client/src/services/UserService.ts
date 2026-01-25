import { API } from "../shared/axios/Interceptors";
import { CreateAdminDTO } from "../types/user/user.types";

export function getUserById(idUser: string) {
  return API.get(`/user/${idUser}`);
}

export function createAdmin(dto: CreateAdminDTO) {
  return API.post("/user/admin/create", dto);
}

export function changePassword(dto: {
  oldPassword: string;
  newPassword: string;
}) {
  return API.put("/user/change", dto);
}

export function getAllUsers() {
  return API.get("/user");
}
