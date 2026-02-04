import express from "express";
import { authorizeRoles } from "../middleware/authorization.js";
import { enforceAuthentication } from "../middleware/authorization.js";
import { OfferController } from "../controllers/OfferController.js";

export const OfferRouter = express.Router();

OfferRouter.post(
  "/send/:idRealEstate",
  enforceAuthentication,
  authorizeRoles("user"),
  OfferController.createOffer,
);

OfferRouter.get(
  "/:idRealEstate",
  enforceAuthentication,
  OfferController.getOffersByRealEstateId,
);

OfferRouter.patch(
  "/:idOffer/choose-status",
  enforceAuthentication,
  authorizeRoles("agent", "manager"),
  OfferController.updateOfferStatus,
);

OfferRouter.patch(
  "/counter-offer/:idOffer",
  enforceAuthentication,
  authorizeRoles("agent", "manager"),
  OfferController.createCounterOffer,
);

OfferRouter.patch(
  "/counter-offer/:idOffer/choose-status",
  enforceAuthentication,
  authorizeRoles("user"),
  OfferController.updateCounterOfferStatus,
);

OfferRouter.post(
  "/sendOffer/non-sistem",
  enforceAuthentication,
  authorizeRoles("agent", "manager"),
  OfferController.createExternalOffer,
);

OfferRouter.get(
  "/my-offers",
  enforceAuthentication,
  authorizeRoles("user"),
  OfferController.getMyOffers,
);
