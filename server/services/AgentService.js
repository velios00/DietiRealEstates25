import randomatic from "randomatic";
import { EmailTemplates } from "../config/mailer.js";

export class AgentService {
  static async createAgent(User, Agent, Manager, ManagerId, dto) {
    if (!User?.findOne || !User?.create) {
      throw new Error("User model is invalid");
    }

    if (!Agent?.create) {
      throw new Error("Agent model is invalid");
    }

    if (!Manager?.findByPk) {
      throw new Error("Manager model is invalid");
    }

    if (!dto?.email) {
      throw new Error("Email is required");
    }

    if (!dto?.name) {
      throw new Error("Name is required");
    }

    if (!dto?.surname) {
      throw new Error("Surname is required");
    }

    const existingUser = await User.findOne({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const randomPassword = randomatic("Aa0", 10);

    const newUser = await User.create({
      email: dto.email,
      password: randomPassword,
      name: dto.name,
      surname: dto.surname,
      role: "agent",
    });
    if (!newUser || !newUser.idUser) {
      throw new Error("User not created");
    }

    const manager = await Manager.findByPk(ManagerId);
    if (!manager || !manager.idAgency) {
      throw new Error("Manager not found");
    }
    const agencyId = manager.idAgency;
    const newAgent = await Agent.create({
      idAgent: newUser.idUser,
      idManager: ManagerId,
      idAgency: agencyId,
    });
    if (!newAgent || !newAgent.idAgent) {
      throw new Error("Agent not created");
    }

    //Invio Email
    try {
      await EmailTemplates.sendWelcomeEmail(
        dto.email,
        dto.name,
        "agent",
        randomPassword,
        null,
      );
    } catch (emailError) {
      console.error("Errore nell'invio dell'email a:", dto.email, emailError);
    }

    return { user: newUser, agent: newAgent };
  }
}
