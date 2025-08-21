import express from "express";
import { AuthenticationController } from "../controllers/AuthenticationController.js";

export const authenticationRouter = express.Router();

authenticationRouter.post("/register", (req, res, next) => {
    console.log("Body ricevuto ", req.body)
    AuthenticationController.registerUser(req.body)
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((err) => {
            next(err);
        })
});

authenticationRouter.post("/login", (req, res, next) => {
    AuthenticationController.loginUser(req.body)
        .then((userFound) => {
            if(userFound){
                res.json(AuthenticationController.issueToken(userFound));
            }
        })
        .catch((err) => {
            next(err);
        })
})
