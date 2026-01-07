import express from "express";
import { AuthenticationController } from "../controllers/AuthenticationController.js";

export const AuthenticationRouter = express.Router();

AuthenticationRouter.post("/register", AuthenticationController.register);

AuthenticationRouter.post("/login", AuthenticationController.login);
