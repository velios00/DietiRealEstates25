import { AgencyMapper } from "../mappers/AgencyMapper.js";
import { Agency, Manager, User } from "../models/DietiRealEstatesDB.js";
import { AgencyService } from "../services/AgencyService.js";


export class AgencyController {

    static async createAgency(req, res, next) {
        try {
            const dto = AgencyMapper.toCreateAgencyDTO(req.body);

            const result = await AgencyService.createAgency(
                Agency,
                User,
                Manager,
                dto
            );

            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    }
}