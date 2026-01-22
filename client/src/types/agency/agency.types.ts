export interface CreateManagerDTO {
  name: string;
  surname: string;
  email: string;
}

export interface ManagerResponseDTO {
  idUser: string;
  email: string;
  name: string;
  surname: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAgencyDTO {
  agencyName: string;
  address: string;
  description: string;
  profileImage: string;
  phoneNumber: string;
  url: string;
  manager: CreateManagerDTO;
}

export interface AgencyResponseDTO {
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
  agency: AgencyResponseDTO;
  manager: ManagerResponseDTO;
}
