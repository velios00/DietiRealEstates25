import { OfferService } from "../../services/OfferService";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";

describe("OfferService", () => {
  let OfferMock;
  let RealEstateMock;

  beforeEach(() => {
    OfferMock = {
      create: jest.fn(),
    };

    RealEstateMock = {
      findByPk: jest.fn(),
    };
  });

  test("TC1 - Happy path: create offer successfully", async () => {
    RealEstateMock.findByPk.mockResolvedValue({
      idRealEstate: 1,
      price: 200000,
      idAgent: 5,
    });

    OfferMock.create.mockResolvedValue({
      idOffer: 1,
    });

    const dto = {
      idRealEstate: 1,
      inSistem: true,
      amount: 150000,
    };
    const result = await OfferService.createOffer(
      OfferMock,
      RealEstateMock,
      dto,
      10,
    );

    expect(OfferMock.create).toHaveBeenCalled();
    expect(result).toBeDefined();
  });

  test("TC2 - Error path: RealEstate not found", async () => {
    RealEstateMock.findByPk.mockResolvedValue(null);

    const dto = {
      idRealEstate: 1,
      inSistem: true,
      amount: 150000,
    };

    await expect(
      OfferService.createOffer(OfferMock, RealEstateMock, dto, 10),
    ).rejects.toThrow();
  });

  test("TC3 - Error path: Invalid offer amount", async () => {
    RealEstateMock.findByPk.mockResolvedValue({
      idRealEstate: 1,
      price: 200000,
      idAgent: 5,
    });

    const dto = {
      idRealEstate: 1,
      inSistem: true,
      amount: 250000, // Invalid amount greater than price
    };

    await expect(
      OfferService.createOffer(OfferMock, RealEstateMock, dto, 10),
    ).rejects.toThrow();
  });

  test("TC4 - Error path: User cannot make offer on own estate", async () => {
    RealEstateMock.findByPk.mockResolvedValue({
      idRealEstate: 1,
      price: 200000,
      idAgent: 10, // Same as user making the offer
    });

    const dto = {
      idRealEstate: 1,
      inSistem: true,
      amount: 150000,
    };

    await expect(
      OfferService.createOffer(OfferMock, RealEstateMock, dto, 10),
    ).rejects.toThrow();
  });
});
