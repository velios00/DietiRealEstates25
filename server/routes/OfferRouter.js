import express from "express";
import { authorizeRoles } from "../middleware/authorization.js";
import { enforceAuthentication } from "../middleware/authorization.js";
import { OfferController } from "../controllers/OfferController.js";

export const OfferRouter = express.Router();

OfferRouter.post(
  "/send",
  enforceAuthentication,
  authorizeRoles("user"),
  OfferController.createOffer
);

OfferRouter.get(
  "/:idRealEstate",
  enforceAuthentication,
  OfferController.getOffersByRealEstateId
);
