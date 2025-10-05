import {Agency, Manager, User } from "../models/DietiRealEstatesDB.js"
import randomatic from "randomatic"
import { sendMail } from "../utils/mailer.js"

export class AdminController {
    static async createAgencyWithMgr(body) {
        const randomString = randomatic("Aa0", 12);
    
        const newUser = await User.create({
            email: body.manager.email,
            name: body.manager.name,
            surname: body.manager.surname,
            password: randomString,
            role: "manager"
        });
    
        const newAgency = await Agency.create({
            agencyName: body.agencyName,
        });
            
        const newManager = await Manager.create({
            idManager: newUser.idUser,
            idAgency: newAgency.idAgency
        });
    
        await newAgency.update({ idManager: newManager.idManager });
    
        await sendMail({
            to: newUser.email,
            subject: `Welcome ${newUser.name}, your temporary password is: ${randomString}`,
            html: `
                <p>Ciao <b>${newUser.name}</b>,</p>
                <p>è stato creato un account per te come <b>manager</b> di <b>${newAgency.agencyName}</b>.</p>
                <p>La tua password temporanea è: <code>${randomString}</code></p>
                <p>Ti consigliamo di cambiarla al primo accesso.</p>
                `,
        })
    
        return newAgency;
    }
    
}