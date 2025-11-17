import { CreateAgencyDTO } from "../DTOs/AgencyDTO.js";
import { createManagerDTO } from "../DTOs/ManagerDTO.js";

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
}