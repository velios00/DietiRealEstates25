export interface CreateAdminDTO {
  email: string;
  name: string;
  surname: string;
}

export interface UserResponseDTO {
  idUser: string;
  email: string;
  name: string;
  surname: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ChangePasswordDTO {
  oldPassword: string;
  newPassword: string;
}
