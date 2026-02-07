import {
  Offer,
  RealEstate,
  User,
  Place,
} from "../models/DietiRealEstatesDB.js";
import { OfferMapper } from "../mappers/OfferMapper.js";
import { OfferService } from "../services/OfferService.js";

export class OfferController {
  static async createOffer(req, res, next) {
    try {
      const { idRealEstate } = req.params;
      const dto = OfferMapper.toCreateOfferDTO(req.body, idRealEstate);
      const createdOffer = await OfferService.createOffer(
        Offer,
        RealEstate,
        dto,
        req.userId,
      );
      const offerDTO = OfferMapper.toOfferDTO(createdOffer);
      res.status(201).json(offerDTO);
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({
          error: "Hai già un'offerta in attesa per questo immobile",
        });
      }
      if (err.message === "Invalid offer amount") {
        return res.status(400).json({
          error:
            "L'offerta deve essere maggiore di 0 e minore del prezzo dell'immobile",
        });
      }
      next(err);
    }
  }

  static async createCounterOffer(req, res, next) {
    try {
      const { idOffer } = req.params;
      const { counterAmount } = req.body;

      if (!counterAmount || counterAmount <= 0) {
        return res.status(400).json({
          error: "Counter offer amount is required and must be positive",
        });
      }

      const counterOffer = await OfferService.createCounterOffer(
        Offer,
        RealEstate,
        idOffer,
        counterAmount,
        req.userId,
      );
      const offerDTO = OfferMapper.toOfferDTO(counterOffer);
      res.status(200).json(offerDTO);
    } catch (err) {
      next(err);
    }
  }

  static async createExternalOffer(req, res, next) {
    try {
      const dto = OfferMapper.toCreateExternalOfferDTO(req.body);
      const externalOffer = await OfferService.createExternalOffer(
        Offer,
        RealEstate,
        dto,
        req.userId,
      );
      const offerDTO = OfferMapper.toOfferDTO(externalOffer);
      res.status(201).json(offerDTO);
    } catch (err) {
      next(err);
    }
  }

  static async updateOfferStatus(req, res, next) {
    try {
      const { idOffer } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({
          error: "Status is required",
        });
      }

      const updatedOffer = await OfferService.updateOfferStatus(
        Offer,
        RealEstate,
        idOffer,
        status,
        req.userId,
      );
      const offerDTO = OfferMapper.toOfferDTO(updatedOffer);
      res.status(200).json(offerDTO);
    } catch (err) {
      next(err);
    }
  }

  static async updateCounterOfferStatus(req, res, next) {
    try {
      const { idOffer } = req.params;
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({
          error: "Status is required",
        });
      }
      const updatedOffer = await OfferService.updateCounterOfferStatus(
        Offer,
        RealEstate,
        idOffer,
        status,
        req.userId,
      );
      const offerDTO = OfferMapper.toOfferDTO(updatedOffer);
      res.status(200).json(offerDTO);
    } catch (err) {
      next(err);
    }
  }

  static async acceptCounterOffer(req, res, next) {
    try {
      const { idOffer } = req.params;
      const acceptedOffer = await OfferService.acceptCounterOffer(
        Offer,
        idOffer,
        req.userId,
      );
      const offerDTO = OfferMapper.toOfferDTO(acceptedOffer);
      res.status(200).json(offerDTO);
    } catch (err) {
      next(err);
    }
  }

  static async getOffersByRealEstateId(req, res, next) {
    try {
      const idRealEstate = req.params.idRealEstate;
      const offers = await OfferService.getOffersByRealEstateId(
        Offer,
        idRealEstate,
        User,
      );
      const offersDTO = offers.map((offer) => OfferMapper.toOfferDTO(offer));
      res.status(200).json(offersDTO);
    } catch (err) {
      next(err);
    }
  }

  static async getHighestPendingOffer(req, res, next) {
    try {
      const { idRealEstate } = req.params;
      const highestOffer = await OfferService.getHighestPendingOffer(
        Offer,
        idRealEstate,
      );
      const offerDTO = OfferMapper.toOfferDTO(highestOffer);
      res.status(200).json(offerDTO);
    } catch (err) {
      next(err);
    }
  }

  static async getMyOffers(req, res, next) {
    try {
      const offers = await OfferService.getMyOffers(Offer, req.userId, User);
      const offersDTO = offers.map((offer) => OfferMapper.toOfferDTO(offer));
      res.status(200).json(offersDTO);
    } catch (err) {
      next(err);
    }
  }

  static async getMyOffersWithEstates(req, res, next) {
    try {
      const offers = await OfferService.getMyOffersWithEstates(
        Offer,
        req.userId,
        User,
        RealEstate,
        Place,
      );
      const offersDTO = offers.map((offer) =>
        OfferMapper.toOfferDTOWithEstate(offer),
      );
      res.status(200).json(offersDTO);
    } catch (err) {
      next(err);
    }
  }
}
