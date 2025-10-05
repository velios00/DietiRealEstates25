import express from "express";
import { AdminController } from "../controllers/AdminController.js";
import { authorizeRoles, enforceAuthentication } from "../middleware/authorization.js";

export const adminRouter = express.Router();

adminRouter.post(
    "/create",
    enforceAuthentication,
    authorizeRoles("admin"),
    (req, res, next) => {
        AdminController.createAgencyWithMgr(req.body)
            .then((agency) => {
                res.status(201).json(agency);
            })
            .catch((err) => {
                next(err);
            })
    }
)