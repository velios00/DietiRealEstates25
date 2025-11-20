import { UserService } from "../services/UserService.js";
import { ChangePasswordDTO } from "../DTOs/UserDTO.js";
import { User } from "../models/DietiRealEstatesDB.js";

export class UserController {

    static async changePassword(req, res, next) {
        try {
            const dto = new ChangePasswordDTO(req.body)
            const result = await UserService.changePassword(
                User,
                dto,
                req.userId
            ); 
            res.status(200).json(result);
        }   catch (err) {
                next(err);
        }
    }




    static async getAllUsers(req, res, next) {
        try {
            const result = await UserService.getAllUsers();
            res.status(200).json(result);
    }
        catch (err) {
            next(err);
        }

    }
}