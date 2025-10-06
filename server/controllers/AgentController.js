import { Agent, User } from "../models/DietiRealEstatesDB.js"

export class AgentController {
    static async getAllAgents() {
        //fai una funzione che ritorna tutti gli agenti includento l'utente associato
        return Agent.findAll({
            include: [{
                model: User,
                attributes: { exclude: ['password'] }
            }]
        })
    }
}