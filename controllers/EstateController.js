import { EstateMapper } from "../mappers/EstateMapper.js";
import { EstateService } from "../services/EstateService.js";
import { RealEstate, Manager, Agent } from "../models/DietiRealEstatesDB.js";


export class EstateController {
    static async createEstate(req, res, next) {
        try {
            console.log("body", req.body)
            const userId = req.userId;
            const dto = EstateMapper.toCreateEstateDTO(req.body);

            const created = EstateService.createEstate(
                RealEstate,
                Agent,
                Manager,
                userId,
                dto
            )
            const result = EstateMapper.estateToDTO(created);

            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    }
}