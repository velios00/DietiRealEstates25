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
