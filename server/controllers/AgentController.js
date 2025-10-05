import { Agent } from "../models/DietiRealEstatesDB.js"

export class AgentController {
    static async getAllAgents() {
        return Agent.findAll();
    }
}