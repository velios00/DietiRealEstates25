export class CreateAdminDTO {
  constructor({ email, name, surname }) {
    if (!email || typeof email !== "string") {
      throw new Error("Email is required and must be a string");
    }
    if (!name || typeof name !== "string") {
      throw new Error("Name is required and must be a string");
    }
    if (!surname || typeof surname !== "string") {
      throw new Error("Surname is required and must be a string");
    }

    this.email = email.trim();
    this.name = name.trim();
    this.surname = surname.trim();
  }
}
