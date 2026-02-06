import express from "express";
import { UserController } from "../controllers/UserController.js";
import {
  authorizeRoles,
  enforceAuthentication,
} from "../middleware/authorization.js";

export const UserRouter = express.Router();
UserRouter.put("/change", enforceAuthentication, UserController.changePassword);

UserRouter.get(
  "/",
  enforceAuthentication,
  UserController.getAllUsers, //,
  //authorizeRoles('admin') dovrebbe esserci ma per ora lo teniamo fuori
);

UserRouter.get("/me", enforceAuthentication, UserController.getCurrentUser);

UserRouter.get("/:idUser", enforceAuthentication, UserController.getUserById);

UserRouter.get(
  "/admin/all",
  enforceAuthentication,
  authorizeRoles("admin"),
  UserController.getAllAdmins,
);

UserRouter.post(
  "/admin/create",
  enforceAuthentication,
  authorizeRoles("admin"),
  UserController.createAdmin,
);

UserRouter.get(
  "/:idUser/agency",
  enforceAuthentication,
  UserController.getUserAgencyId,
);
