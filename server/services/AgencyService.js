import randomatic from "randomatic";
import { EmailTemplates } from "../utils/mailer.js";

export class AgencyService {
  static async createAgency(Agency, User, Manager, dto) {
    const temporaryPassword = randomatic("Aa0", 10);

    const newUser = await User.create({
      email: dto.manager.email,
      password: temporaryPassword,
      name: dto.manager.name,
      surname: dto.manager.surname,
      role: "manager",
    });

    const newAgency = await Agency.create({
      agencyName: dto.agencyName,
      address: dto.address,
      description: dto.description,
      profileImage: dto.profileImage,
      phoneNumber: dto.phoneNumber,
      url: dto.url,
    });

    await Manager.create({
      idManager: newUser.idUser,
      idAgency: newAgency.idAgency,
    });

    //Invio Email
    try {
      await EmailTemplates.sendManagerWelcome(
        dto.manager.email,
        dto.manager.name,
        dto.agencyName,
        temporaryPassword,
      );
      console.log("Email inviata con successo a:", dto.manager.email);
    } catch (emailError) {
      console.error(
        "Errore nell'invio dell'email a:",
        dto.manager.email,
        emailError,
      );
    }

    return {
      agency: newAgency,
      manager: newUser,
    };
  }

  static async getAllAgencies(Agency, Manager, User) {
    //manager e' null, aggiustare
    const agencies = await Agency.findAll({
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
    return agencies;
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

  static async getRealEstatesByAgencyId(Agency, idAgency) {
    const agency = await Agency.findByPk(idAgency, {
      include: ["RealEstates"],
    });
    if (!agency) {
      throw new Error("Agency not found");
    }
    return agency.RealEstates;
  }
}
