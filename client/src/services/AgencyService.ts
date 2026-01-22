// src/services/AgencyService.ts
import { API } from "../shared/axios/Interceptors";
import {
  CreateAgencyDTO,
  AgencyResponseDTO,
  CreateAgencyResponse,
} from "../types/agency/agency.types";

class AgencyService {
  /**
   * Crea una nuova agenzia con il manager associato
   * Endpoint: POST /agencies (verifica l'endpoint esatto del tuo backend)
   */
  async createAgency(
    agencyData: CreateAgencyDTO,
  ): Promise<CreateAgencyResponse> {
    try {
      const response = await API.post<CreateAgencyResponse>(
        "/agencies",
        agencyData,
      );
      return response.data;
    } catch (error) {
      console.error("Error creating agency:", error);
      throw this.handleError(error);
    }
  }

  /**
   * Ottiene tutte le agenzie
   * Endpoint: GET /agencies
   */
  async getAllAgencies(): Promise<AgencyResponseDTO[]> {
    try {
      const response = await API.get<AgencyResponseDTO[]>("/agencies");
      return response.data;
    } catch (error) {
      console.error("Error fetching agencies:", error);
      throw this.handleError(error);
    }
  }

  /**
   * Ottiene un'agenzia per ID
   * Endpoint: GET /agency/:idAgency
   */
  async getAgencyById(idAgency: string): Promise<AgencyResponseDTO> {
    try {
      const response = await API.get<AgencyResponseDTO>(`/agency/${idAgency}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching agency ${idAgency}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Ottiene gli immobili di un'agenzia
   * Endpoint: GET /agency/:idAgency/real-estates
   */
  async getRealEstatesByAgencyId(idAgency: string): Promise<any[]> {
    try {
      const response = await API.get<any[]>(`/agency/${idAgency}/real-estates`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching real estates for agency ${idAgency}:`,
        error,
      );
      throw this.handleError(error);
    }
  }

  /**
   * Aggiorna un'agenzia
   * Endpoint: PUT /agency/:idAgency
   */
  async updateAgency(
    idAgency: string,
    updateData: Partial<CreateAgencyDTO>,
  ): Promise<AgencyResponseDTO> {
    try {
      const response = await API.put<AgencyResponseDTO>(
        `/agency/${idAgency}`,
        updateData,
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating agency ${idAgency}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Elimina un'agenzia
   * Endpoint: DELETE /agency/:idAgency
   */
  async deleteAgency(idAgency: string): Promise<void> {
    try {
      await API.delete(`/agency/${idAgency}`);
    } catch (error) {
      console.error(`Error deleting agency ${idAgency}:`, error);
      throw this.handleError(error);
    }
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
  private handleError(error: any): Error {
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
}

// Esporta un'istanza singleton
export default new AgencyService();
