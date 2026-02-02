import { CreateManagerDTO, ManagerResponseDTO } from "./Manager.model";

export interface CreateAgency {
  agencyName: string;
  address: string;
  description: string;
  profileImage: string;
  phoneNumber: string;
  url: string;
  manager: CreateManagerDTO;
}

// Risposta che arriva dal backend per le agenzie
export interface AgencyResponse {
  idAgency: string;
  agencyName: string;
  address: string;
  description: string;
  profileImage: string;
  phoneNumber: string;
  url: string;
  idManager?: string;
  managerName?: string;
  createdAt?: string;
  updatedAt?: string;
  manager?: ManagerResponseDTO;
}

export interface CreateAgencyResponse {
  agency: AgencyResponse;
  manager: ManagerResponseDTO;
}
