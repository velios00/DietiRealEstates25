import { AuthenticationService } from './AuthenticationService.js';
import { User, Manager, Agent, Admin } from '../models/DietiRealEstatesDB.js';
import { createHash } from 'crypto';

export class UserService {

    static hashPassword(password){return createHash("sha256").update(password).digest("hex")}

    static async changePassword(User, dto, userId) {
        const user = await User.findByPk(userId); 
        
        if(!user) { 
            throw new Error('User not found');
        }

        const oldPwd = UserService.hashPassword(dto.oldPassword);
        if(user.password !== oldPwd) {
            throw new Error('Old password is incorrect');
        }
    
        user.password = dto.newPassword;
        await user.save();

        return { message: 'Password changed successfully' };
    }

    static async getAllUsers(User) {
        return await User.findAll({
            attributes: { exclude: ['password'] } // Exclude password from the result
        });
    }

        static async getUserById(User, idUser) {
        return await User.findByPk(idUser, {
            attributes: { exclude: ['password'] } // Don't return password
        });
    }

}
