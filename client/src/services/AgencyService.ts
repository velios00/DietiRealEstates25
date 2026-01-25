// src/services/AgencyService.ts
import { API } from "../shared/axios/Interceptors";
import {
  CreateAgencyDTO,
  AgencyResponseDTO,
  CreateAgencyResponse,
} from "../types/agency/agency.types";

/**
 * Crea una nuova agenzia con il manager associato
 * Endpoint: POST /agency (verifica l'endpoint esatto del tuo backend)
 */
export async function createAgency(
  agencyData: CreateAgencyDTO,
): Promise<CreateAgencyResponse> {
  const response = await API.post<CreateAgencyResponse>(
    "/agency/createAgency",
    agencyData,
  );
  return response.data;
}

/**
 * Ottiene tutte le agenzie
 * Endpoint: GET /agencies
 */
export async function getAllAgencies(): Promise<AgencyResponseDTO[]> {
  const response = await API.get<AgencyResponseDTO[]>("/agency");
  return response.data;
}

/**
 * Ottiene un'agenzia per ID
 * Endpoint: GET /agency/:idAgency
 */
export async function getAgencyById(
  idAgency: string,
): Promise<AgencyResponseDTO> {
  const response = await API.get<AgencyResponseDTO>(`/agency/${idAgency}`);
  return response.data;
}

/**
 * Ottiene gli immobili di un'agenzia
 * Endpoint: GET /agency/:idAgency/real-estates
 */
export async function getRealEstatesByAgencyId(
  idAgency: string,
): Promise<any[]> {
  const response = await API.get<any[]>(`/agency/${idAgency}/real-estates`);
  return response.data;
}

/**
 * Aggiorna un'agenzia
 * Endpoint: PUT /agency/:idAgency
 */
export async function updateAgency(
  idAgency: string,
  updateData: Partial<CreateAgencyDTO>,
): Promise<AgencyResponseDTO> {
  const response = await API.put<AgencyResponseDTO>(
    `/agency/${idAgency}`,
    updateData,
  );
  return response.data;
}

/**
 * Elimina un'agenzia
 * Endpoint: DELETE /agency/:idAgency
 */
export async function deleteAgency(idAgency: string): Promise<void> {
  await API.delete(`/agency/${idAgency}`);
}

/* Cerca agenzie (per ora non impl)
  async searchAgencies(searchTerm: string): Promise<AgencyResponseDTO[]> {
    try {
      const response = await API.get<AgencyResponseDTO[]>("/agencies/search", {
        params: { q: searchTerm }
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching agencies:`, error);
      throw this.handleError(error);
    }
  }
  */

//Gestione errori
export function handleError(error: any): Error {
  if (error.response) {
    const { status, data } = error.response;
    return new Error(
      `Errore Server ${status}: ${data.message || data.error || "Errore sconosciuto"}`,
    );
  } else if (error.request) {
    return new Error("Errore di rete: Nessuna risposta dal server");
  } else {
    return new Error(`Errore nella richiesta: ${error.message}`);
  }
}
