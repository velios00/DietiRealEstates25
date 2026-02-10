export class CreateManagerDTO {
  constructor({ email, password, name, surname }) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.surname = surname;
  }
}
