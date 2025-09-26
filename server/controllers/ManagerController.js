import { Agent, Manager, User } from "../models/DietiRealEstatesDB.js";

export class ManagerController {
    static async createAgent(body, userId) {
        const manager = await Manager.findOne({ where: { idManager: userId }});
        if(!manager) {
            throw new Error("Only managers can create agents.");
        }

        const newUser = await User.create({
            email: body.email,
            password: body.password,
            name: body.name,
            surname: body.surname,
            role: "agent"
        });

        const newAgent = await Agent.create({
            idAgent: newUser.idUser,
            idManager: manager.idManager,
            idAgency: manager.idAgency,
        });

        return { user: newUser, agent: newAgent };
    }
}