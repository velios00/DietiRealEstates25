export class OfferService {
  static async createOffer(Offer, RealEstate, dto, userId) {
    if (userId == null || userId <= 0) {
      throw new Error("Invalid user id");
    }
    const estate = await RealEstate.findByPk(dto.idRealEstate);
    if (!estate) {
      throw new Error("RealEstate not found");
    }
    if (estate.idAgent === userId || estate.idManager === userId) {
      throw new Error("Cannot make an offer on your own estate");
    }
    if (dto.amount <= 0 || dto.amount >= estate.price) {
      throw new Error("Invalid offer amount");
    }

    const newOffer = await Offer.create({
      idRealEstate: dto.idRealEstate,
      dateOffer: new Date(),
      inSistem: dto.inSistem,
      amount: dto.amount,
      status: "pending",
      idUser: userId,
    });
    return newOffer;
  }

  static async createCounterOffer(
    Offer,
    RealEstate,
    offerId,
    counterAmount,
    userId,
  ) {
    const offer = await Offer.findByPk(offerId);
    if (!offer) {
      throw new Error("Offer not found");
    }
    const estate = await RealEstate.findByPk(offer.idRealEstate);
    if (!estate) {
      throw new Error("RealEstate not found");
    }
    if (estate.idAgent !== userId && estate.idManager !== userId) {
      throw new Error("Only agent or manager can make counter offers");
    }
    if (offer.status !== "pending") {
      throw new Error("Can only counter a pending offer");
    }
    if (counterAmount <= 0 || counterAmount >= estate.price) {
      throw new Error("Invalid counter offer amount");
    }
    if (counterAmount <= offer.amount) {
      throw new Error("Counter offer must be higher than the original offer");
    }
    await offer.update({
      status: "countered",
      counterOfferAmount: counterAmount,
    });

    return offer;
  }

  static async updateCounterOfferStatus(
    Offer,
    RealEstate,
    offerId,
    newStatus,
    userId,
  ) {
    const offer = await Offer.findByPk(offerId);
    if (!offer) {
      throw new Error("Offer not found");
    }
    if (offer.status !== "countered") {
      throw new Error("Can only update status of countered offers");
    }
    if (!["accepted", "rejected"].includes(newStatus)) {
      throw new Error("Invalid status. Must be 'accepted' or 'rejected'");
    }
    if (offer.idUser !== userId) {
      throw new Error(
        "Only the user who made the offer can answer to the counter offer",
      );
    }
    await offer.update({ status: newStatus });
    return offer;
  }

  /**
   * Agente o Manager accettano/rifiutano offerta
   */
  static async updateOfferStatus(
    Offer,
    RealEstate,
    offerId,
    newStatus,
    userId,
  ) {
    const offer = await Offer.findByPk(offerId);
    if (!offer) {
      throw new Error("Offer not found");
    }

    // Validazione dello status
    if (!["accepted", "rejected"].includes(newStatus)) {
      throw new Error("Invalid status. Must be 'accepted' or 'rejected'");
    }

    const estate = await RealEstate.findByPk(offer.idRealEstate);
    if (!estate) {
      throw new Error("RealEstate not found");
    }

    if (estate.idAgent !== userId && estate.idManager !== userId) {
      throw new Error("Only agent or manager can update offer status");
    }

    if (offer.status !== "pending") {
      throw new Error("Can only update pending offers");
    }

    await offer.update({ status: newStatus });
    return offer;
  }

  static async createExternalOffer(Offer, RealEstate, dto, userId) {
    const estate = await RealEstate.findByPk(dto.idRealEstate);
    if (!estate) {
      throw new Error("RealEstate not found");
    }

    if (estate.idAgent !== userId && estate.idManager !== userId) {
      throw new Error("Only agent or manager can add external offers");
    }

    if (dto.amount <= 0 || dto.amount >= estate.price) {
      throw new Error("Invalid offer amount");
    }

    // Crea l'offerta da fuori (inSistem: false)
    const newOffer = await Offer.create({
      idRealEstate: dto.idRealEstate,
      dateOffer: new Date(),
      inSistem: dto.inSistem,
      amount: dto.amount,
      status: "pending",
      idUser: userId,
    });
    return newOffer;
  }

  static async getOffersByRealEstateId(Offer, idRealEstate, User) {
    const offers = await Offer.findAll({
      where: { idRealEstate },
      include: [{ model: User, attributes: ["name", "surname"] }],
    });
    return offers;
  }

  static async getMyOffers(Offer, userId, User) {
    if (!User || typeof User !== "object" || Array.isArray(User)) {
      throw new Error("User model is invalid");
    }
    const offers = await Offer.findAll({
      where: { idUser: userId },
      include: [{ model: User, attributes: ["name", "surname"] }],
      order: [["dateOffer", "DESC"]],
    });
    if (offers === null || offers === undefined || !Array.isArray(offers)) {
      throw new Error("Failed to retrieve offers");
    }
    return offers;
  }

  static async getMyOffersWithEstates(Offer, userId, User, RealEstate, Place) {
    const offers = await Offer.findAll({
      where: { idUser: userId },
      include: [
        { model: User, attributes: ["name", "surname"] },
        {
          model: RealEstate,
          include: [
            {
              model: Place,
              attributes: ["idPlace", "city", "address"],
            },
          ],
        },
      ],
      order: [["dateOffer", "DESC"]],
    });
    return offers;
  }
}
