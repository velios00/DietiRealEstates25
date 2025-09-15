import express from 'express';
import { RealEstateController } from "../controllers/RealEstateController.js";
import { enforceAuthentication, authorizeRoles } from '../middleware/authorization.js';

export const realEstateRouter = express.Router();

realEstateRouter.post(
    "/",
    enforceAuthentication,
    authorizeRoles("agente", "manager"),
    RealEstateController.createRealEstate
);

