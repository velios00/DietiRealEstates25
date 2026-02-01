import { Roles } from "../enums/Roles.enum";

export interface User {
  idUser: string;
  email: string;
  name: string;
  surname: string;
  userAddress: string;
  role: Roles;
}

export interface CreateAdmin {
  email: string;
  name: string;
  surname: string;
}

export interface UserResponseDTO {
  idUser: string;
  email: string;
  name: string;
  surname: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ChangePasswordDTO {
  oldPassword: string;
  newPassword: string;
}
