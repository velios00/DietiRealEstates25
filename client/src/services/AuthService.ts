import { API } from "../shared/axios/Interceptors";
import type {
  RegisterRequest,
  GoogleAuthRequest,
  LoginRequest,
} from "../shared/models/AuthRequest.model";

export function loginUser(authRequest: LoginRequest) {
  return API.post(`/login`, authRequest);
}

export function registerUser(registerRequest: RegisterRequest) {
  return API.post(`/register`, registerRequest);
}

export function googleLoginUser(authRequest: GoogleAuthRequest) {
  return API.post(`/googleLogin`, { idToken: authRequest.firebaseToken });
}
