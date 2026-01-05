import Jwt from "jsonwebtoken";
import { createHash } from "crypto";

export class AuthenticationService {

   static hashPassword(password) {
        return createHash("sha256").update(password).digest("hex");
    }
 
    static async registerUser(userModel, dto) {
        const existingUser = await userModel.findOne({ where: { email: dto.email } });
        if (existingUser) {
            throw new Error("Email already exists");
        }


        const newUser = await userModel.create({
            email: dto.email,
            name: dto.name,
            surname: dto.surname, 
            password: dto.password,
            userAddress: dto.userAddress,
            role: dto.role
        });

        return newUser;
    }

    static async loginUser(userModel, dto) {
        const hashedPassword = this.hashPassword(dto.password);
        console.log("dto", dto)
        const foundUser = await userModel.findOne({
            where: { email: dto.email, password: hashedPassword }    
        });

        if (!foundUser) {
            throw new Error("Invalid email or password");
        }
        
        return foundUser;
    }

    static issueToken(user) {
        const token = Jwt.sign(
            {
                user: {
                    idUser: user.idUser,
                    username: user.email,
                    role: user.role
                },
            },
            process.env.TOKEN_SECRET,
            { expiresIn: "1h" }
        );

        return { token };
    }

    static verifyToken(token, callback) {
        Jwt.verify(token, process.env.TOKEN_SECRET, callback);
    }
}