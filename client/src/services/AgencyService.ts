import { API } from "../shared/axios/Interceptors";
import { Agency, CreateAgencyResponse } from "../shared/models/Agency.model";

export async function createAgency(
  agencyData: FormData,
): Promise<CreateAgencyResponse> {
  const response = await API.post<CreateAgencyResponse>(
    "/agency/createAgency",
    agencyData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
}

export async function getAgencyById(idAgency: string): Promise<Agency> {
  const response = await API.get<Agency>(`/agency/${idAgency}`);
  return response.data;
}

export async function getAllAgencies(): Promise<Agency[]> {
  const response = await API.get<Agency[]>("/agency");
  return response.data;
}
