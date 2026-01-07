export class ChangePasswordDTO {
  constructor({ oldPassword, newPassword }) {
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }
}

export class UserDTO {
  constructor({ idUser, email, name, surname, role, userAddress }) {
    this.idUser = idUser;
    this.email = email;
    this.name = name;
    this.surname = surname;
    this.role = role;
    this.userAddress = userAddress;
  }
}
