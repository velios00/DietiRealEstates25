import { Agency, User, Manager } from "../models/DietiRealEstatesDB.js"

export class AgencyController {
    static async createAgencyWithMgr(body) {

        const newUser = await User.create({
            email: body.manager.email,
            name: body.manager.name,
            surname: body.manager.surname,
            password: body.manager.password,
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


        return newAgency;
    }

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