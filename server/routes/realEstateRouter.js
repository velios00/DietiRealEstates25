import express from 'express';
import { RealEstateController } from "../controllers/RealEstateController.js";
import { enforceAuthentication, authorizeRoles } from '../middleware/authorization.js';

export const realEstateRouter = express.Router();

realEstateRouter.post(
    "/create",
    enforceAuthentication,
    authorizeRoles("agent", "manager"),
    (req, res, next) => {
        RealEstateController.createRealEstate(req.body, req.userId)
            .then((realEstate) => {
                res.status(201).json(realEstate);
            })
            .catch((err) => {
                next(err);
            });
    }
);

