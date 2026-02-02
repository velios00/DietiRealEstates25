import { CreateManager, ManagerResponse } from "./Manager.model";

export interface CreateAgency {
  agencyName: string;
  address: string;
  description: string;
  profileImage: string;
  phoneNumber: string;
  url: string;
  manager: CreateManager;
}

// Risposta che arriva dal backend per le agenzie
export interface Agency {
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
  manager?: ManagerResponse;
}

export interface CreateAgencyResponse {
  agency: Agency;
  manager: ManagerResponse;
}
