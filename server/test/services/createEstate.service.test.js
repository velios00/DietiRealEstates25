import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { EstateService } from "../../services/EstateService.js";

describe("EstateService.createEstate - R-WECT", () => {
  let RealEstateMock, AgentMock, ManagerMock, PlaceMock;

  const validDto = {
    title: "Appartamento",
    description: "Bellissimo appartamento",
    photos: ["photo1.jpg", "photo2.jpg", "photo3.jpg"],
    price: 150000,
    size: 80,
    nRooms: 4,
    nBathrooms: 2,
    energyClass: "A",
    floor: 2,
    type: "apartment",
    address: "Via Roma 1",
    city: "Milano",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    RealEstateMock = {
      create: jest.fn().mockResolvedValue({
        idEstate: 100,
        ...validDto,
      }),
    };

    AgentMock = {
      findByPk: jest.fn(),
    };

    ManagerMock = {
      findByPk: jest.fn(),
    };

    PlaceMock = {
      findOne: jest.fn().mockResolvedValue({
        idPlace: 5,
        lat: 45.4642,
        lon: 9.19,
      }),
      create: jest.fn().mockResolvedValue({
        idPlace: 6,
        lat: 45.4642,
        lon: 9.19,
      }),
    };
  });

  // ========== VALIDATION TESTS (non richiedono API calls) ==========

  test("TC1 - Error Path: less than 3 photos", async () => {
    const invalidDto = { ...validDto, photos: ["p1", "p2"] };

    await expect(
      EstateService.createEstate(
        RealEstateMock,
        AgentMock,
        ManagerMock,
        PlaceMock,
        1,
        invalidDto,
        "api-key",
        [],
      ),
    ).rejects.toThrow("Sono richieste almeno 3 foto");
  });

  test("TC2 - Error Path: more than 10 photos", async () => {
    const invalidDto = { ...validDto, photos: Array(11).fill("photo.jpg") };

    await expect(
      EstateService.createEstate(
        RealEstateMock,
        AgentMock,
        ManagerMock,
        PlaceMock,
        1,
        invalidDto,
        "api-key",
        [],
      ),
    ).rejects.toThrow("Massimo 10 foto consentite");
  });

  test("TC3 - Error Path: photos is null", async () => {
    const invalidDto = { ...validDto, photos: null };

    await expect(
      EstateService.createEstate(
        RealEstateMock,
        AgentMock,
        ManagerMock,
        PlaceMock,
        1,
        invalidDto,
        "api-key",
        [],
      ),
    ).rejects.toThrow("Sono richieste almeno 3 foto");
  });

  test("TC4 - Error Path: photos is undefined", async () => {
    const invalidDto = { ...validDto, photos: undefined };

    await expect(
      EstateService.createEstate(
        RealEstateMock,
        AgentMock,
        ManagerMock,
        PlaceMock,
        1,
        invalidDto,
        "api-key",
        [],
      ),
    ).rejects.toThrow("Sono richieste almeno 3 foto");
  });

  test("TC5 - Error Path: price is 0", async () => {
    const invalidDto = { ...validDto, price: 0 };

    await expect(
      EstateService.createEstate(
        RealEstateMock,
        AgentMock,
        ManagerMock,
        PlaceMock,
        1,
        invalidDto,
        "api-key",
        [],
      ),
    ).rejects.toThrow("Il prezzo deve essere maggiore di 0");
  });

  test("TC6 - Error Path: price is negative", async () => {
    const invalidDto = { ...validDto, price: -100 };

    await expect(
      EstateService.createEstate(
        RealEstateMock,
        AgentMock,
        ManagerMock,
        PlaceMock,
        1,
        invalidDto,
        "api-key",
        [],
      ),
    ).rejects.toThrow("Il prezzo deve essere maggiore di 0");
  });

  test("TC7 - Error Path: price is null", async () => {
    const invalidDto = { ...validDto, price: null };

    await expect(
      EstateService.createEstate(
        RealEstateMock,
        AgentMock,
        ManagerMock,
        PlaceMock,
        1,
        invalidDto,
        "api-key",
        [],
      ),
    ).rejects.toThrow("Il prezzo deve essere maggiore di 0");
  });

  test("TC8 - Error Path: price is not integer", async () => {
    const invalidDto = { ...validDto, price: 150.5 };

    await expect(
      EstateService.createEstate(
        RealEstateMock,
        AgentMock,
        ManagerMock,
        PlaceMock,
        1,
        invalidDto,
        "api-key",
        [],
      ),
    ).rejects.toThrow("Il prezzo deve essere un numero intero");
  });

  test("TC9 - Error Path: bathrooms equals rooms", async () => {
    const invalidDto = { ...validDto, nBathrooms: 4, nRooms: 4 };

    await expect(
      EstateService.createEstate(
        RealEstateMock,
        AgentMock,
        ManagerMock,
        PlaceMock,
        1,
        invalidDto,
        "api-key",
        [],
      ),
    ).rejects.toThrow(
      "Il numero di bagni deve essere inferiore al numero di locali",
    );
  });

  test("TC10 - Error Path: bathrooms > rooms", async () => {
    const invalidDto = { ...validDto, nBathrooms: 5, nRooms: 4 };

    await expect(
      EstateService.createEstate(
        RealEstateMock,
        AgentMock,
        ManagerMock,
        PlaceMock,
        1,
        invalidDto,
        "api-key",
        [],
      ),
    ).rejects.toThrow(
      "Il numero di bagni deve essere inferiore al numero di locali",
    );
  });

  // ========== USER AUTHENTICATION TESTS ==========

  test("TC11 - Error Path: user neither manager nor agent", async () => {
    ManagerMock.findByPk.mockResolvedValue(null);
    AgentMock.findByPk.mockResolvedValue(null);

    await expect(
      EstateService.createEstate(
        RealEstateMock,
        AgentMock,
        ManagerMock,
        PlaceMock,
        999,
        validDto,
        "api-key",
        [],
      ),
    ).rejects.toThrow("User is neither a manager nor an agent");
  });

  test("TC12 - Error Path: manager is undefined", async () => {
    ManagerMock.findByPk.mockResolvedValue(undefined);
    AgentMock.findByPk.mockResolvedValue(null);

    await expect(
      EstateService.createEstate(
        RealEstateMock,
        AgentMock,
        ManagerMock,
        PlaceMock,
        999,
        validDto,
        "api-key",
        [],
      ),
    ).rejects.toThrow("User is neither a manager nor an agent");
  });

  test("TC13 - Error Path: agent is null or undefined (same behaviour)", async () => {
    ManagerMock.findByPk.mockResolvedValue(null);
    AgentMock.findByPk.mockResolvedValue(undefined);

    await expect(
      EstateService.createEstate(
        RealEstateMock,
        AgentMock,
        ManagerMock,
        PlaceMock,
        999,
        validDto,
        "api-key",
        [],
      ),
    ).rejects.toThrow("User is neither a manager nor an agent");
  });
});
