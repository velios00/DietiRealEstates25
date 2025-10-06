import express from "express";
import { enforceAuthentication } from "../middleware/authorization.js";
import { AgencyController } from "../controllers/agencyController.js";
import { authorizeRoles } from "../middleware/authorization.js";

export const agencyRouter = express.Router();

agencyRouter.get(
    "/",
    enforceAuthentication,
    authorizeRoles("admin", "manager", "agent", "user"),
    (req, res, next) => {
        AgencyController.getAllAgencies()
            .then((agencies) => {
                res.status(201).json(agencies);
            })
            .catch((err) => {
                next(err);
            })
    }
)

agencyRouter.get(
    "/:id",
    enforceAuthentication,
    authorizeRoles("admin", "manager", "agent", "user"),
    (req, res, next) => {
        AgencyController.getAgencyById(req.params.id)
            .then((agency) => {
                res.status(201).json(agency);
            })
            .catch((err) => {
                next(err);
            })
    }
)

agencyRouter.get(
    "/:id/real-estates",
    enforceAuthentication,
    authorizeRoles("admin", "manager", "agent", "user"),
    (req, res, next) => {
        AgencyController.getRealEstatesByAgencyId(req.params.id)
            .then((realEstates) => {
                res.status(201).json(realEstates);
            })
            .catch((err) => {
                next(err);
            })
    }
)