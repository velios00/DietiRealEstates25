import { Roles } from "../enums/Roles.enum";

export interface User {
  idUser: number;
  email: string;
  name: string;
  surname: string;
  userAddress: string;
  role: Roles;
}
