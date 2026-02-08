import { CreateAgencyDTO } from "../DTOs/AgencyDTO.js";
import { createManagerDTO } from "../DTOs/ManagerDTO.js";
import { AgencyDTO } from "../DTOs/AgencyDTO.js";

export class AgencyMapper {
  static toCreateAgencyDTO(body) {
    const managerDTO = new createManagerDTO({
      name: body.managerName,
      surname: body.managerSurname,
      email: body.managerEmail,
    });
    return new CreateAgencyDTO({
      agencyName: body.agencyName,
      address: body.address,
      description: body.description,
      profileImage: body.profileImage,
      phoneNumber: body.phoneNumber,
      url: body.url,
      manager: managerDTO,
    });
  }

  static agencyToDTO(agency) {
    // Estrai i dati del manager se presenti
    const managerData = agency.Manager?.User
      ? {
          idUser: agency.Manager.User.idUser,
          email: agency.Manager.User.email,
          name: agency.Manager.User.name,
          surname: agency.Manager.User.surname,
          role: agency.Manager.User.role,
        }
      : null;

    return new AgencyDTO({
      idAgency: agency.idAgency,
      agencyName: agency.agencyName,
      address: agency.address,
      description: agency.description,
      profileImage: agency.profileImage,
      phoneNumber: agency.phoneNumber,
      url: agency.url,
      idManager: agency.Manager ? agency.Manager.idManager : null,
      manager: managerData,
    });
  }

  static agencyListToDTO(agencies) {
    return agencies.map((agency) => AgencyMapper.agencyToDTO(agency));
  }
}
