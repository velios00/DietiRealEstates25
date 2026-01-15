import { AuthUser } from "./AuthUser.model";

export interface UserContextData {
  user: AuthUser;
  setUser: (user: AuthUser | null) => void;
}
