import { AgentMapper } from "../mappers/AgentMapper.js";
import { AgentService } from "../services/AgentService.js";
import { Agent, User, Manager } from "../models/DietiRealEstatesDB.js";

export class AgentController {
  static async createAgent(req, res, next) {
    try {
      const idManager = req.userId;
      const dto = AgentMapper.toCreateAgentDTO(req.body);

      const { user, agent } = await AgentService.createAgent(
        User,
        Agent,
        Manager,
        idManager,
        dto,
      );
      const result = AgentMapper.toAgentDTO(user, agent);

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
}
