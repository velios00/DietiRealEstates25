import { Roles } from "../enums/Roles.enum";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
  surname: string;
  userAddress: string;
  role: Roles;
}

export interface GoogleAuthRequest {
  firebaseToken: string;
}
