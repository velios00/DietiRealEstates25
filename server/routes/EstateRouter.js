import express from "express";
import { authorizeRoles } from "../middleware/authorization.js";
import { enforceAuthentication } from "../middleware/authorization.js";
import { EstateController } from "../controllers/EstateController.js";

export const EstateRouter = express.Router();

EstateRouter.post(
  "/create",
  enforceAuthentication,
  authorizeRoles("agent", "manager"),
  EstateController.createEstate,
);

EstateRouter.delete(
  "/:id",
  enforceAuthentication,
  authorizeRoles("agent", "manager"),
  EstateController.deleteEstate,
);

EstateRouter.get(
  "/agency/:idAgency",
  enforceAuthentication,
  EstateController.getEstatesByAgency,
);

EstateRouter.get("/search", EstateController.searchEstates);

EstateRouter.get("/:id", EstateController.getEstateById);
