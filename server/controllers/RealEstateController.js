import { Agent, RealEstate } from "../models/DietiRealEstatesDB.js";

export class RealEstateController {
    // bisogna ancora implementare tipo di acquisto (vendita/affitto)
    static async createRealEstate(body, userId) {
        //console.log("UserId dal token:", userId);
        const agent = await Agent.findOne({ where: { idAgent: userId }});
        //console.log("Agente trovato:", agent);
        if(!agent) {
            throw new Error("Only agents can create real estate listings.");
        }
        const newRealEstate = await RealEstate.create({
            title: body.title,
            description: body.description,
            price: body.price,
            address: body.address,
            size: body.size,
            idAgency: body.idAgency,
            idAgent: agent.idAgent
        })

        return newRealEstate;
    }

    static async getAllRealEstates() {
        return RealEstate.findAll();
    }
}