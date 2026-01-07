import { Offer, RealEstate } from "../models/DietiRealEstatesDB.js";
import { OfferMapper } from "../mappers/OfferMapper.js";
import { OfferService } from "../services/OfferService.js";

export class OfferController {
  static async createOffer(req, res, next) {
    try {
      const dto = OfferMapper.toCreateOfferDTO(req.body);
      const createdOffer = await OfferService.createOffer(
        Offer,
        RealEstate,
        dto,
        req.userId
      );
      res.status(201).json(createdOffer);
    } catch (err) {
      next(err);
    }
  }

  static async getOffersByRealEstateId(req, res, next) {
    try {
      const idRealEstate = req.params.idRealEstate;
      const offers = await OfferService.getOffersByRealEstateId(
        Offer,
        idRealEstate
      );
      res.status(200).json(offers);
    } catch (err) {
      next(err);
    }
  }
}
