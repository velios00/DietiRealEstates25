import { API } from "../shared/axios/Interceptors";
import { endpoints } from "../shared/constants/api";
import type {
  RegisterRequest,
  GoogleAuthRequest,
  LoginRequest,
} from "../shared/models/AuthRequest";

export function loginUser(authRequest: LoginRequest) {
  return API.post(`${endpoints.auth}/login`, authRequest);
}

export function registerUser(registerRequest: RegisterRequest) {
  return API.post(`${endpoints.auth}/register`, registerRequest);
}

export function googleLoginUser(authRequest: GoogleAuthRequest) {
  return (
    API.post(`${endpoints.auth}/googleLogin`, authRequest),
    {},
    {
      headers: {
        Authorization: `Bearer ${authRequest.firebaseToken}`,
      },
    }
  );
}
