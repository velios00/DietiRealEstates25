import { Roles } from "../enums/Roles.enum";

export interface AuthUser {
  idUser: string;
  email: string;
  role: Roles;
}
