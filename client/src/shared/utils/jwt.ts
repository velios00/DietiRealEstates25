import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../models/JwtPayload.model";

export const decodeToken = (token: string): JwtPayload =>
  jwtDecode<JwtPayload>(token);

export const isTokenExpired = (exp: number): boolean =>
  Date.now() >= exp * 1000;
