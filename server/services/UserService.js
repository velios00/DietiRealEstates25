import { createHash } from "crypto";
import { EmailTemplates } from "../config/mailer.js";
import { createAdminDTO } from "../DTOs/AdminDTO.js";
import randomatic from "randomatic";

export class UserService {
  static hashPassword(password) {
    if (!password) {
      throw new Error("Password cannot be empty");
    }

    return createHash("sha256").update(password).digest("hex");
  }

  static async changePassword(User, dto, userId) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Create a temporary user to hash the old password the same way the model does
    const tempUser = User.build({ password: dto.oldPassword });
    const oldHashedPassword = tempUser.password;

    if (user.password !== oldHashedPassword) {
      throw new Error("Old password is incorrect");
    }

    // Let model handle new password hashing
    user.password = dto.newPassword;
    await user.save();

    return { message: "Password changed successfully" };
  }

  static async getAllUsers(User) {
    return await User.findAll({
      attributes: { exclude: ["password"] }, // Exclude password from the result
    });
  }

  static async getAllAdmins(Admin) {
    return await User.findAll({
      where: { role: "admin" },
      attributes: { exclude: ["password"] }, // Exclude password from the result
    });
  }

  static async getUserById(User, idUser) {
    return await User.findByPk(idUser, {
      attributes: { exclude: ["password"] }, // Don't return password
    });
  }

  static async createAdmin(User, Admin, dto) {
    const existingUser = await User.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      console.log("Email già esistente:", dto.email);
      throw new Error(
        `L'email ${dto.email} è già utilizzata da un altro utente`,
      );
    }

    const temporaryPassword = randomatic("Aa0", 10);

    const newUser = await User.create({
      email: dto.email,
      password: temporaryPassword,
      name: dto.name,
      surname: dto.surname,
      role: "admin",
    });

    await Admin.create({
      idAdmin: newUser.idUser,
    });

    await EmailTemplates.sendAdminWelcome(
      dto.email,
      dto.name,
      temporaryPassword,
    );

    return {
      idUser: newUser.idUser,
      email: newUser.email,
      name: newUser.name,
      surname: newUser.surname,
      role: newUser.role,
      temporaryPassword,
    };
  }
  static async getUserAgencyId(User, Agent, Manager, idUser) {
    const user = await User.findByPk(idUser);

    if (!user) {
      throw new Error("User not found");
    }

    console.log(`Looking for agency for user ${idUser} with role ${user.role}`);

    let agencyId = null;

    if (user.role === "agent") {
      // Cerca Agent usando idUser come idAgent (foreign key condivisa)
      const agent = await Agent.findByPk(idUser);

      if (!agent) {
        console.error(`Agent not found with idAgent = ${idUser}`);
        throw new Error("Agent record not found for this user");
      }

      agencyId = agent.idAgency;
      console.log(`Found agent with agency ID: ${agencyId}`);
    } else if (user.role === "manager") {
      // Cerca Manager usando idUser come idManager (foreign key condivisa)
      const manager = await Manager.findByPk(idUser);

      if (!manager) {
        console.error(`Manager not found with idManager = ${idUser}`);
        throw new Error("Manager record not found for this user");
      }

      agencyId = manager.idAgency;
      console.log(`Found manager with agency ID: ${agencyId}`);
    } else {
      throw new Error(`User role '${user.role}' is not an agent or manager`);
    }

    if (!agencyId) {
      throw new Error("Agency ID not found");
    }

    return agencyId;
  }
}
