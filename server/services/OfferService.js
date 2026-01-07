export class OfferService {
  static async createOffer(Offer, RealEstate, dto, userId) {
    const estate = await RealEstate.findByPk(dto.idRealEstate);
    if (!estate) {
      throw new Error("RealEstate not found");
    }
    if (estate.idAgent === userId || estate.idManager === userId) {
      throw new Error("Cannot make an offer on your own estate");
    }
    if (dto.amount <= 0 || dto.amount > estate.price) {
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

  static async getOffersByRealEstateId(Offer, idRealEstate) {
    const offers = await Offer.findAll({
      where: { idRealEstate },
    });
    return offers;
  }
}
