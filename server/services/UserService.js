import { createHash } from "crypto";
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

  static async getUserById(User, idUser) {
    return await User.findByPk(idUser, {
      attributes: { exclude: ["password"] }, // Don't return password
    });
  }

  static async createAdmin(User, Admin, dto) {
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

    return {
      idUser: newUser.idUser,
      email: newUser.email,
      name: newUser.name,
      surname: newUser.surname,
      role: newUser.role,
      temporaryPassword,
    };

    console.log(temporaryPassword);
  }
}
