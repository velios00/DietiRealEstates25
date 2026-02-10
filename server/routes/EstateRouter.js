import express from "express";
import {
  authorizeRoles,
  enforceAuthentication,
} from "../middleware/authorization.js";
import { EstateController } from "../controllers/EstateController.js";
import { upload } from "../middleware/multer.js";

export const EstateRouter = express.Router();

EstateRouter.post(
  "/create",
  enforceAuthentication,
  authorizeRoles("agent", "manager"),
  upload.array("photos", 10),
  EstateController.createEstate,
);

EstateRouter.get(
  "/my-estates",
  enforceAuthentication,
  authorizeRoles("agent", "manager"),
  EstateController.getMyEstates,
);

EstateRouter.delete(
  "/:id",
  enforceAuthentication,
  authorizeRoles("agent", "manager"),
  EstateController.deleteEstate,
);

EstateRouter.get("/search", EstateController.searchEstates);

EstateRouter.get("/:id", EstateController.getEstateById);
