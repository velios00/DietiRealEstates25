import { OfferService } from "../../services/OfferService";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";

describe("OfferService, R-SECT", () => {
  let OfferMock;
  let RealEstateMock;

  const validEstate = {
    idRealEstate: 1,
    price: 200000,
    idAgent: 5,
  };

  const validDto = {
    idRealEstate: 1,
    amount: 150000,
    inSistem: true,
  };

  const validIdUser = 10;

  beforeEach(() => {
    OfferMock = {
      create: jest.fn(),
    };

    RealEstateMock = {
      findByPk: jest.fn(),
    };
  });

  test("TC1 - Happy path: create offer successfully", async () => {
    RealEstateMock.findByPk.mockResolvedValue({ validEstate });

    OfferMock.create.mockResolvedValue({
      idOffer: 1,
    });

    const result = await OfferService.createOffer(
      OfferMock,
      RealEstateMock,
      validDto,
      validIdUser,
    );

    expect(OfferMock.create).toHaveBeenCalled();
    expect(result).toEqual({ idOffer: 1 });
  });

  test("TC2 - Error Path: Offer = null", async () => {
    RealEstateMock.findByPk.mockResolvedValue({ validEstate });

    await expect(
      OfferService.createOffer(null, RealEstateMock, validDto, validIdUser),
    ).rejects.toThrow();
  });

  test("TC3 - Error Path: Offer = undefined", async () => {
    RealEstateMock.findByPk.mockResolvedValue({ validEstate });

    await expect(
      OfferService.createOffer(
        undefined,
        RealEstateMock,
        validDto,
        validIdUser,
      ),
    ).rejects.toThrow();
  });

  test("TC4 - Error Path: Offer = {}", async () => {
    RealEstateMock.findByPk.mockResolvedValue({ validEstate });

    await expect(
      OfferService.createOffer({}, RealEstateMock, validDto, validIdUser),
    ).rejects.toThrow();
  });

  test("TC5 - Error Path: RealEstate = null", async () => {
    await expect(
      OfferService.createOffer(OfferMock, null, validDto, validIdUser),
    ).rejects.toThrow();
  });

  test("TC6 - Error Path: RealEstate = undefined", async () => {
    await expect(
      OfferService.createOffer(OfferMock, undefined, validDto, validIdUser),
    ).rejects.toThrow();
  });

  test("TC7 - Error Path: RealEstate = {}", async () => {
    await expect(
      OfferService.createOffer(OfferMock, {}, validDto, validIdUser),
    ).rejects.toThrow();
  });

  test("TC8 - Error Path: not existent idRealEstate", async () => {
    RealEstateMock.findByPk.mockResolvedValue(null);

    await expect(
      OfferService.createOffer(
        OfferMock,
        RealEstateMock,
        validDto,
        validIdUser,
      ),
    ).rejects.toThrow("RealEstate not found");
  });

  test("TC9 - Error Path: idRealEstate null or undefined (same behaviour)", async () => {
    RealEstateMock.findByPk.mockResolvedValue(null);

    await expect(
      OfferService.createOffer(
        OfferMock,
        RealEstateMock,
        { ...validDto, idRealEstate: null },
        validIdUser,
      ),
    ).rejects.toThrow("RealEstate not found");
  });

  test("TC10 - Error Path: idRealEstate <= 0", async () => {
    RealEstateMock.findByPk.mockResolvedValue(null);

    await expect(
      OfferService.createOffer(
        OfferMock,
        RealEstateMock,
        { ...validDto, idRealEstate: -1 },
        validIdUser,
      ),
    ).rejects.toThrow("RealEstate not found");
  });

  test("TC11 - Error Path: amount <= 0 or >= EstatePrice (same behaviour)", async () => {
    RealEstateMock.findByPk.mockResolvedValue({ validEstate });

    await expect(
      OfferService.createOffer(
        OfferMock,
        RealEstateMock,
        { ...validDto, amount: -1000 },
        validIdUser,
      ),
    ).rejects.toThrow("Invalid offer amount");
  });

  test("TC12 - Error Path: amount null or undefined (same behaviour)", async () => {
    RealEstateMock.findByPk.mockResolvedValue({ validEstate });

    await expect(
      OfferService.createOffer(
        OfferMock,
        RealEstateMock,
        { ...validDto, amount: null },
        validIdUser,
      ),
    ).rejects.toThrow("Invalid offer amount");
  });

  test("TC13 - Error Path: idUser is Agent (or Manager, same behaviour)", async () => {
    RealEstateMock.findByPk.mockResolvedValue({
      ...validEstate,
      idAgent: validIdUser,
    });

    await expect(
      OfferService.createOffer(
        OfferMock,
        RealEstateMock,
        validDto,
        validIdUser,
      ),
    ).rejects.toThrow("Cannot make an offer on your own estate");
  });

  test("TC14 - Error Path: not existing idUser", async () => {
    RealEstateMock.findByPk.mockResolvedValue({ validEstate });

    await OfferService.createOffer(
      OfferMock,
      RealEstateMock,
      validDto,
      9999, // idUser non esistente
    ).rejects.toThrow();

    expect(OfferMock.create).toHaveBeenCalled();
  });

  test("TC15 - Error Path: idUser null or undefined (same behaviour)", async () => {
    RealEstateMock.findByPk.mockResolvedValue({ validEstate });

    await expect(
      OfferService.createOffer(
        OfferMock,
        RealEstateMock,
        validDto,
        null, // idUser null
      ),
    ).rejects.toThrow();
  });

  test("TC16 - Error Path: idUser <= 0 ", async () => {
    RealEstateMock.findByPk.mockResolvedValue({ validEstate });
    await expect(
      OfferService.createOffer(
        OfferMock,
        RealEstateMock,
        validDto,
        -1, // idUser <= 0
      ),
    ).rejects.toThrow();
  });
});
