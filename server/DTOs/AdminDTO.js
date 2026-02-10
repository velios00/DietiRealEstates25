export class CreateAdminDTO {
  constructor({ email, name, surname }) {
    this.email = email;
    this.name = name;
    this.surname = surname;
  }
}
