import randomatic from "randomatic";
import { EmailTemplates } from "../config/mailer.js";
import { ImageService } from "./ImageService.js";

export class AgencyService {
  static async createAgency(Agency, User, Manager, dto, file) {
    const transaction = await Agency.sequelize.transaction();
    const temporaryPassword = randomatic("Aa0", 10);

    // Handle image upload and fallback
    let profileImage = dto.profileImage;
    if (file) {
      profileImage = await ImageService.uploadImage(file);
    }
    dto.profileImage = profileImage;

    try {
      const existingUser = await User.findOne({
        where: { email: dto.manager.email },
      });
      if (existingUser) {
        throw new Error("Email already exists");
      }

      // Create User WITHIN transaction
      const newUser = await User.create(
        {
          email: dto.manager.email,
          password: temporaryPassword,
          name: dto.manager.name,
          surname: dto.manager.surname,
          role: "manager",
        },
        { transaction },
      );

      // Create Agency WITHIN transaction
      const newAgency = await Agency.create(
        {
          agencyName: dto.agencyName,
          address: dto.address,
          description: dto.description,
          profileImage: dto.profileImage,
          phoneNumber: dto.phoneNumber,
          url: dto.url,
        },
        { transaction },
      );

      // Create Manager WITHIN transaction
      await Manager.create(
        {
          idManager: newUser.idUser,
          idAgency: newAgency.idAgency,
        },
        { transaction },
      );

      await newAgency.update(
        {
          idManager: newUser.idUser,
        },
        { transaction },
      );

      await transaction.commit();

      EmailTemplates.sendWelcomeEmail(
        dto.manager.email,
        dto.manager.name,
        "manager",
        dto.agencyName,
        temporaryPassword,
      );

      return { agency: newAgency, manager: newUser };
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
  static async getAllAgencies(Agency, Manager, User) {
    const agencies = await Agency.findAll({
      include: [
        {
          model: Manager,
          include: [
            {
              model: User,
              attributes: ["idUser", "email", "name", "surname", "role"],
              as: "User",
            },
          ],
          as: "Manager",
        },
      ],
      attributes: [
        "idAgency",
        "agencyName",
        "address",
        "description",
        "profileImage",
        "phoneNumber",
        "url",
        "createdAt",
      ],
    });

    return agencies.map((agency) => {
      const agencyData = agency.get({ plain: true });
      return {
        ...agencyData,
        manager: agencyData.Manager?.User || null,
      };
    });
  }

  static async getAgencyById(Agency, Manager, User, idAgency) {
    const agency = await Agency.findByPk(idAgency, {
      include: [
        {
          model: Manager,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    });
    if (!agency) {
      throw new Error("Agency not found");
    }
    return agency;
  }
}
