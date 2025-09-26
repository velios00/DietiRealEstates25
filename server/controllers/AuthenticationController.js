import { Admin, Manager, Agent, User } from "../models/DietiRealEstatesDB.js"
import Jwt from "jsonwebtoken";


export class AuthenticationController {
    //Registrazione di un User normale
    static async registerUser(body) {
        const { email, username, password, name, surname, address, role } = body;

        const found = await User.findOne({ where: { email } });
        if (found) {
            throw new Error("Email already exists");
        }
        const newUser = await User.create({
            email,
            username,
            password,
            name,
            surname,
            address,
            role
        });

        return newUser;
    }

    static async loginUser(body) {
        const user = new User({ email: body.email, password: body.password });

        //console.log("User in login", user)
        const foundUser = await User.findOne({ where: { email: user.email, password: user.password } });

        if(!foundUser) {
            throw new Error("email or password incorrect");
        }
        return foundUser;
    }

    static issueToken(user) {
        const createdToken = Jwt.sign(
            {
                user: {
                    idUser: user.idUser,
                    username: user.email,
                    role: user.role
                },
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: "1h",
            }
        );
        return{
            token: createdToken,
        }
    };

    static isTokenValid(token, callback) {
        Jwt.verify(token, process.env.TOKEN_SECRET, callback);
    }
}