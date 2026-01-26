import express from "express";
import { AgencyController } from "../controllers/AgencyController.js";
import { enforceAuthentication } from "../middleware/authorization.js";
import { authorizeRoles } from "../middleware/authorization.js";

export const AgencyRouter = express.Router();

AgencyRouter.post(
  "/createAgency",
  enforceAuthentication,
  authorizeRoles("admin"),
  AgencyController.createAgency,
);

AgencyRouter.get(
  "/",
  enforceAuthentication,
  authorizeRoles("admin"),
  AgencyController.getAllAgencies,
);

AgencyRouter.get("/:idAgency", AgencyController.getAgencyById);
<<<<<<< HEAD
=======

AgencyRouter.delete(
  "/:idAgency",
  enforceAuthentication,
  authorizeRoles("admin"),
  AgencyController.deleteAgency,
);

// AgencyRouter.get(
//   "/:idAgency/real-estates",
//   AgencyController.getRealEstatesByAgencyId,
// );
>>>>>>> 9545c78637ba0360c015819725e5700753d389b6
