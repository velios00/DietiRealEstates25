import { Roles } from "../enums/Roles.enum";

export interface User {
  idUser: string;
  email: string;
  name: string;
  surname: string;
  userAddress: string;
  role: Roles;
}
