import { User } from "../models/DietiRealEstatesDB.js";
import { createHash } from "crypto"; 

export class UserController {
    static async getAllUsers() {
        return User.findAll({
            attributes: { exclude: ['password'] }
        })
    }

    static async changePassword(req){
        console.log(req);
        const userId = req.userId;
        const user = await User.findByPk(userId);
        if(!user){
            throw new Error("User Not Found.");
        }
        const oldPasswordHash = createHash("sha256").update(req.body.oldPassword).digest("hex");
        if(oldPasswordHash !== user.password){
            throw new Error("Old Password is incorrect.");
        };
        user.password = req.body.newPassword;
        await user.save();

        return {message : "Password changed successfully."};
    }
}