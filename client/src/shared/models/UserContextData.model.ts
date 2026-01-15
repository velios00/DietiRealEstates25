import { Roles } from "../enums/Roles.enum";
import { User } from "./User.model";

export interface UserContextData {
  user: User | null;
  setUser: (user: User | null) => void;

  role: Roles | null;
  setRole: (role: Roles | null) => void;
}
