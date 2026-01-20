import { Roles } from "../enums/Roles.enum";

export interface JwtPayload {
  user: {
    idUser: string;
    email: string;
    role: Roles;
  };
  exp: number;
}
