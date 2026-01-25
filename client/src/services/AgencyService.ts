import { API } from "../shared/axios/Interceptors";
import {
  CreateAgencyDTO,
  AgencyResponse,
  CreateAgencyResponse,
} from "../shared/models/Agency.model";

export async function createAgency(
  agencyData: CreateAgencyDTO,
): Promise<CreateAgencyResponse> {
  const response = await API.post<CreateAgencyResponse>(
    "/agency/createAgency",
    agencyData,
  );
  return response.data;
}

export async function getAllAgencies(): Promise<AgencyResponse[]> {
  const response = await API.get<AgencyResponse[]>("/agency");
  return response.data;
}

export async function getAgencyById(idAgency: string): Promise<AgencyResponse> {
  const response = await API.get<AgencyResponse>(`/agency/${idAgency}`);
  return response.data;
}
