import { Agency, User, Manager } from "../models/DietiRealEstatesDB.js"

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
}