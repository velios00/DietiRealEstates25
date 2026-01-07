import express from "express";
import { upload } from "../middleware/multer.js";
import {
  authorizeRoles,
  enforceAuthentication,
} from "../middleware/authorization.js";

export const ImageRouter = express.Router();

ImageRouter.post(
  "/upload",
  enforceAuthentication,
  authorizeRoles("admin", "agent", "manager"),
  upload.single("image"),
  ImageController.uploadImage
);
