import express from "express";
import { AgentController } from "../controllers/AgentController.js";
import {
  enforceAuthentication,
  authorizeRoles,
} from "../middleware/authorization.js";

export const AgentRouter = express.Router();

AgentRouter.post(
  "/create",
  enforceAuthentication,
  authorizeRoles("manager"),
  AgentController.createAgent,
);
