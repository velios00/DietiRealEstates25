import { API } from "../shared/axios/Interceptors";
import { CreateAgent } from "../shared/models/Agent.model";

export function createAgent(agentData: CreateAgent) {
  return API.post("/agents/create", agentData, {
    headers: { "Content-Type": "application/json" },
  });
}
