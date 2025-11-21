import express from "express";
import { authorizeRoles } from "../middleware/authorization.js";
import { enforceAuthentication } from "../middleware/authorization.js";
import { EstateController } from "../controllers/EstateController.js";


export const EstateRouter = express.Router();

EstateRouter.post(
    "/create",
    enforceAuthentication,
    authorizeRoles("agent", "manager"),
    EstateController.createEstate
)

