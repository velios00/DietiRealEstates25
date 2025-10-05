import express from "express";
import { ManagerController } from "../controllers/ManagerController.js";
import { authorizeRoles, enforceAuthentication } from "../middleware/authorization.js";

export const managerRouter = express.Router();

managerRouter.post("/create-agent",
    enforceAuthentication,
    authorizeRoles("manager"),
    (req, res) => {
    ManagerController.createAgent(req.body, req.userId)
        .then((agent) => {
            res.status(201).json(agent);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        })
})