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

// Dati del manager inclusi nell'Agency
export interface ManagerData {
  idUser: string;
  email: string;
  name: string;
  surname: string;
  role: string;
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
  createdAt?: string;
  updatedAt?: string;
  manager?: ManagerData;
}

export interface CreateAgencyResponse {
  agency: Agency;
  manager: ManagerResponse;
}
