import { createAgentDTO } from "../DTOs/AgentDTO.js";

export class AgentMapper {
  static toCreateAgentDTO(body) {
    return new createAgentDTO({
      name: body.name,
      surname: body.surname,
      email: body.email,
      profileImage: body.profileImage,
    });
  }

  static toAgentDTO(user, agent) {
    return {
      idAgent: agent.idAgent,
      idUser: user.idUser,
      name: user.name,
      surname: user.surname,
      email: user.email,
      profileImage: user.profileImage,
    };
  }
}
