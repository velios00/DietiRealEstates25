import { API } from "../shared/axios/Interceptors";
import { CreateAdminDTO } from "../types/user/user.types";

export function getUserById(idUser: string) {
  return API.get(`/users/${idUser}`);
}

class UserService {
  static async createAdmin(dto: CreateAdminDTO) {
    try {
      const response = await API.post("/users/admin/create", dto);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async changePassword(dto: {
    oldPassword: string;
    newPassword: string;
  }) {
    try {
      const response = await API.put("/users/change", dto);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllUsers() {
    try {
      const response = await API.get("/users");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(idUser: string) {
    try {
      const response = await API.get(`/users/${idUser}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
