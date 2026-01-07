export class RegisterUserDTO {
  constructor({ email, name, surname, password, userAddress, role }) {
    this.email = email;
    this.name = name;
    this.surname = surname;
    this.password = password;
    this.userAddress = userAddress;
    this.role = role;
  }
}

export class LoginUserDTO {
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }
}

export class GoogleLoginDTO {
  constructor({ idToken }) {
    if (!idToken) {
      throw new Error("idToken is required for Google Login");
    }
    this.idToken = idToken;
  }
}
