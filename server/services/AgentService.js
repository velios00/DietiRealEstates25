import randomatic from "randomatic";
import { EmailTemplates } from "../config/mailer.js";

export class AgentService {
  static async createAgent(User, Agent, Manager, ManagerId, dto) {
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
      profileImage: dto.profileImage,
      role: "agent",
    });

    const manager = await Manager.findByPk(ManagerId);
    if (!manager) {
      throw new Error("Manager not found");
    }
    const agencyId = manager.idAgency;
    const newAgent = await Agent.create({
      idAgent: newUser.idUser,
      idManager: ManagerId,
      idAgency: agencyId,
    });

    //Invio Email
    try {
      await EmailTemplates.sendWelcomeEmail(
        dto.email,
        dto.name,
        "agent",
        null,
        randomPassword,
      );
    } catch (emailError) {
      console.error("Errore nell'invio dell'email a:", dto.email, emailError);
    }

    return { user: newUser, agent: newAgent };
  }
}
