import { AuthenticationService } from "../services/AuthenticationService.js";
import { RegisterUserDTO, LoginUserDTO } from "../DTOs/AuthorizationDTO.js";
import { User } from "../models/DietiRealEstatesDB.js";

export class AuthenticationController {

    static async register(req, res, next) {
        try {
            const dto = new RegisterUserDTO(req.body);
            const newUser = await AuthenticationService.registerUser(User, dto);
            res.status(201).json(newUser);
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const dto = new LoginUserDTO(req.body);
            const foundUser = await AuthenticationService.loginUser(User, dto);
            res.json(AuthenticationService.issueToken(foundUser));
        } catch (err) {
            next(err);
        }
    }

    static isTokenValid(token, callback) {
        AuthenticationService.verifyToken(token, callback);
    }
}