import express from "express";
import { UserController } from "../controllers/UserController.js";
import { enforceAuthentication } from "../middleware/authorization.js";
export const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    UserController.getAllUsers()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
})

userRouter.put("/changepassword", 
    enforceAuthentication,
    (req, res) => {
        UserController.changePassword(req)
            .then((message) => {
                res.status(200).json(message);
            })
            .catch((err) => {
                res.status(500).json({ message: err.message });
            });

    })