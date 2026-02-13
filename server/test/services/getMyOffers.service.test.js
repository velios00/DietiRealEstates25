import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { OfferService } from "../../services/OfferService";

describe("getMyOffers - R-WECT", () => {
  let OfferMock, UserMock;

  const validUserId = 10;

  const validOffers = [
    {
      idOffer: 1,
      idUser: 10,
      User: { name: "John", surname: "Doe" },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    OfferMock = {
      findAll: jest.fn(),
    };

    UserMock = {};
  });

  test("TC1 - Happy path: get my offers successfully", async () => {
    OfferMock.findAll.mockResolvedValue(validOffers);

    const result = await OfferService.getMyOffers(
      OfferMock,
      validUserId,
      UserMock,
    );

    expect(OfferMock.findAll).toHaveBeenCalledWith({
      where: { idUser: validUserId },
      include: [{ model: UserMock, attributes: ["name", "surname"] }],
      order: [["dateOffer", "DESC"]],
    });
    expect(result).toEqual(validOffers);
  });

  test("TC2 - Error Path: Offer = null", async () => {
    OfferMock.findAll.mockResolvedValue(null);
    await expect(
      OfferService.getMyOffers(OfferMock, validUserId, UserMock),
    ).rejects.toThrow("Failed to retrieve offers");
  });

  test("TC3 - Error Path: Offer = undefined", async () => {
    OfferMock.findAll.mockResolvedValue(undefined);
    await expect(
      OfferService.getMyOffers(OfferMock, validUserId, UserMock),
    ).rejects.toThrow("Failed to retrieve offers");
  });

  test("TC4 - Error Path: Offer is {} ", async () => {
    OfferMock.findAll.mockResolvedValue({});
    await expect(
      OfferService.getMyOffers(OfferMock, validUserId, UserMock),
    ).rejects.toThrow("Failed to retrieve offers");
  });

  test("TC5 - Error Path: User is null", async () => {
    OfferMock.findAll.mockResolvedValue(validOffers);
    await expect(
      OfferService.getMyOffers(OfferMock, validUserId, null),
    ).rejects.toThrow("User model is invalid");
  });

  test("TC6 - Error Path: User is undefined", async () => {
    OfferMock.findAll.mockResolvedValue(validOffers);
    await expect(
      OfferService.getMyOffers(OfferMock, validUserId, undefined),
    ).rejects.toThrow("User model is invalid");
  });

  test("TC7 - Error Path: User is {} ", async () => {
    OfferMock.findAll.mockResolvedValue(validOffers);
    const result = await OfferService.getMyOffers(OfferMock, validUserId, {});
    expect(result).toEqual(validOffers);
  });

  test("TC8 - Error Path: userId does not exist in the database", async () => {
    OfferMock.findAll.mockResolvedValue([]);
    const result = await OfferService.getMyOffers(OfferMock, 9999, UserMock);
    expect(result).toEqual([]);
  });

  test("TC9 - Error Path: userId is null or undefined (same behaviour)", async () => {
    await expect(
      OfferService.getMyOffers(OfferMock, null, UserMock),
    ).rejects.toThrow();
  });
});
