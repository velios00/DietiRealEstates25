import { EstateMapper } from "../mappers/EstateMapper.js";
import { EstateService } from "../services/EstateService.js";
import { RealEstate, Manager, Agent } from "../models/DietiRealEstatesDB.js";

export class EstateController {
    static async createEstate(req, res, next) {
        try {
            console.log("body", req.body)
            const userId = req.userId;
            const dto = EstateMapper.toCreateEstateDTO(req.body);

            console.log("dto", dto);

            const created = await EstateService.createEstate(
                RealEstate,
                Agent,
                Manager,
                userId,
                dto
            )
            
            const result = EstateMapper.estateToDTO(created);
            console.log("estate raaaaaaaaaaesult", result)
            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    }

    static async deleteEstate(req, res, next) {
        try {
            const userId = req.userId;
            const estateId = parseInt(req.params.id);

            if (isNaN(estateId)) {
                return res.status(400).json({ error: "Invalid estate ID" });
            }

            await EstateService.deleteEstate(
                RealEstate,
                Agent,
                Manager,
                userId,
                estateId
            );

            res.status(200).json({ message: "Estate deleted successfully" });
        } catch (err) {
            next(err);
        }
    }

    static async getEstateById(req, res, next){
            try{
                const estateId = parseInt(req.params.id); // Change here
        
                if (isNaN(estateId)) {
                    return res.status(400).json({ error: "Invalid estate ID" });
                }

                const estate = await EstateService.getEstateById(RealEstate, req.params.id);
    
                if (!estate) {
                     return res.status(404).json({ message: "Estate not found" });
                    }
    
                const result = EstateMapper.estateToDTO(estate);
                res.status(200).json(result);
            }
    
            catch (err) { 
                next(err);
            }
        }

}