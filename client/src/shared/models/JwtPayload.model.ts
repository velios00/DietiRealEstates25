import { Roles } from "../enums/Roles.enum";

export interface JwtPayload {
  user: {
    idUser: string;
    username: string;
    role: Roles;
  };
  exp: number;
}
