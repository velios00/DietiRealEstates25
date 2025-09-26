import { Agent, RealEstate } from "../models/DietiRealEstatesDB.js";

export class RealEstateController {
    static async createRealEstate(body, userId) {
        const agent = await Agent.findOne({ where: { idAgent: userId }});
        console.log(agent)
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
            idAgent: agent.id
        })

        return newRealEstate;
    }
}