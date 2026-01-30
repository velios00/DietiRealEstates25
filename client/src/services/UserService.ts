import { API } from "../shared/axios/Interceptors";
import {
  CreateAdminDTO,
  ChangePasswordDTO,
  User,
} from "../shared/models/User.model";
import { AuthUser } from "../shared/models/AuthUser.model";

export function getUserById(idUser: string) {
  return API.get(`/user/${idUser}`);
}

export function createAdmin(dto: CreateAdminDTO) {
  return API.post("/user/admin/create", dto);
}

export function changePassword(dto: ChangePasswordDTO) {
  return API.put("/user/change", dto);
}

export function getAllUsers() {
  return API.get("/user");
}

export function getAllAdmins() {
  return API.get("/user/admin/all");
}

export function hasRole(user: User | null, role: string): boolean {
  return user?.role === role;
}

export function canMakeOffer(user: AuthUser | null): boolean {
  if (!user) return false;
  if (user.role !== "user" && user.role !== "admin") return false;
  return true;
}

export function getUserAgencyId(idUser: number) {
  return API.get(`/user/${idUser}/agency`);
}
