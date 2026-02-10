export class CreateAgentDTO {
  constructor({ name, surname, email, profileImage }) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.profileImage = profileImage;
  }
}
