import { RealEstate } from "../models/DietiRealEstatesDB.js";

export class RealEstateController {
    static async createRealEstate(req, res) {
        try {
            const { title, description, price, address, idAgency } = req.body;

            //prendiamo id dell'agente loggato dal token
            const idAgent = req.userId;

            const realEstate = await RealEstate.create({
                title,
                description,
                price,
                address,
                idAgency,
                idAgent
            });

            return res.status(201).json(realEstate);
        } catch (err) {
            return res.status(500).json({
                message: "Error creating real estate",
                error: err.message
            });
        }
    }
}