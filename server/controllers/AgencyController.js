import { Agency, User, Manager, RealEstate, Agent } from "../models/DietiRealEstatesDB.js"

export class AgencyController {

    static async getAllAgencies() {
        return Agency.findAll({
            include: [{
                model: Manager,
                include: [{
                    model: User,
                    attributes: { exclude: ['password'] }
                }]
            }]
        })
    }

    static async getAgencyById(id) {
        return Agency.findByPk(id, {
            include: [{
                model: Manager,
                include: [{
                    model: User,
                    attributes: { exclude: ['password'] }
                }]
            }]
        })
    }

    static async getRealEstatesByAgencyId(id) {
        const agency = await Agency.findByPk(id, {
            include: [{
                model: RealEstate,
                include: [{
                    model: Agent,
                    attributes: ["idAgent"]
                }]
            }]
        })
        if(!agency) {
            throw new Error("Agency not found.");
        }

        return agency;
    }
}