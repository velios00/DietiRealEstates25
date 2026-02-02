import { AuthUser } from "./AuthUser.model";
import { Roles } from "../enums/Roles.enum";

export interface UserContextData {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  role: Roles | null;
  setRole: (role: Roles | null) => void;
}
