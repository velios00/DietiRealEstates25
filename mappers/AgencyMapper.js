import { CreateAgencyDTO } from "../DTOs/AgencyDTO.js";
import { createManagerDTO } from "../DTOs/ManagerDTO.js";
import { AgencyDTO } from "../DTOs/AgencyDTO.js";
export class AgencyMapper {
    static toCreateAgencyDTO(body) {
        const managerDTO = new createManagerDTO(body.manager);
        return new CreateAgencyDTO({
            agencyName: body.agencyName,
            address: body.address,
            description: body.description,
            profileImage: body.profileImage,
            phoneNumber: body.phoneNumber,
            url: body.url,
            manager: managerDTO
        });
    }

    static agencyToDTO(agency) {
        return new AgencyDTO({
            idAgency: agency.idAgency,
            agencyName: agency.agencyName,
            idManager: agency.idManager,
            managerName:
                agency.Manager && agency.Manager.User
                    ? `${agency.Manager.User.name} ${agency.Manager.User.surname}`
                    : null
        });
    }

    static agencyListToDTO(agencies) {
        return agencies.map(agency => AgencyMapper.agencyToDTO(agency));
    }
}