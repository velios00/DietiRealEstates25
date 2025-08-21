import { Admin, Manager, Agente, Utente } from "../models/DietiRealEstatesDB.js"
import Jwt from "jsonwebtoken";


export class AuthenticationController {
    //Registrazione di un utente normale
    static async registerUser(body) {
        const { email, username, password, nome, cognome, indirizzo } = body;

        const found = await Utente.findOne({ where: { email } });
        if (found) {
            throw new Error("Email esistente");
        }
        const newUser = await Utente.create({
            email,
            username,
            password,
            nome,
            cognome,
            indirizzo
        });

        return newUser;
    }

    static async loginUser(body) {
        const user = new Utente({ email: body.email, password: body.password });

        console.log("Utente in login", user)
        const foundUser = await Utente.findOne({ where: { email: user.email, password: user.password } });

        if(!foundUser) {
            throw new Error("email o password invalidi");
        }
        return foundUser;
    }

    static issueToken(user) {
        const createdToken = Jwt.sign(
            {
                user: {
                    id: user.id,
                    username: user.email,
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