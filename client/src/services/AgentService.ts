import { API } from "../shared/axios/Interceptors";
import { CreateAgent } from "../shared/models/Agent.model";

export function createAgent(dto: CreateAgent) {
  return API.post("/agents/create", {
    name: dto.name,
    surname: dto.surname,
    email: dto.email,
    profileImage: dto.profileImage || undefined,
  });
}
