import { User } from "../models/DietiRealEstatesDB.js";

export class UserController {
    static async getAllUsers() {
        return User.findAll({
            attributes: { exclude: ['password'] }
        })
    }
}