import axios from "axios";
import { baseUrl } from "../constants/api";

export const API = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});

//standardizzazione errori
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const formattedError = {
      status: error.response?.status || 500,
      // Se non c'è una descrizione dal server, usa il messaggio di errore di axios o uno generico
      message:
        error.response?.data?.description ||
        error.message ||
        "Errore di connessione al server",
    };
    return Promise.reject(formattedError);
  },
);

//Interceptor per aggiungere il token alle richieste
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }
  return req;
});

//Interceptor per sloggare l'utente se il token non è più valido
export function logOutInterceptor(navigateFn: (path: string) => void) {
  API.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.status === 401) {
        localStorage.removeItem("token");
        navigateFn("/login");
      }
      return Promise.reject(error);
    },
  );
}
