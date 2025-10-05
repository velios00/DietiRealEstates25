import express from "express";
import { AgentController } from "../controllers/AgentController.js";

export const agentRouter = express.Router();

agentRouter.get("/agents", (req, res, next) => {
    AgentController.getAllAgents()
        .then((agents) => {
            res.json(agents);
        })
        .catch((err) => {
            next(err);
        })
})