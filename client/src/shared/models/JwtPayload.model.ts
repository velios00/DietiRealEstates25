import { Roles } from "../enums/Roles.enum";

export interface JwtPayload {
  idUser: number;
  username: string;
  role: Roles;
  exp: number;
}
