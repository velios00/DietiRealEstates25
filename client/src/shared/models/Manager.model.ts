export interface CreateManager {
  name: string;
  surname: string;
  email: string;
}

export interface ManagerResponse {
  idUser: string;
  email: string;
  name: string;
  surname: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}
