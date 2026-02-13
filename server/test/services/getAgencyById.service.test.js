import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { AgencyService } from "../../services/AgencyService.js";

describe("getAgencyById - R-WECT", () => {
  let AgencyMock, ManagerMock, UserMock;

  const validAgency = {
    idAgency: 5,
    agencyName: "Best Agency",
    address: "123 Main St",
    description: "Top agency",
    profileImage: "image-url",
    phoneNumber: "1234567890",
    url: "https://bestagency.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    AgencyMock = {
      findByPk: jest.fn(),
    };

    ManagerMock = {};
    UserMock = {};
  });

  test("TC1 - Happy path: get agency by id successfully", async () => {
    AgencyMock.findByPk.mockResolvedValue(validAgency);

    const result = await AgencyService.getAgencyById(
      AgencyMock,
      ManagerMock,
      UserMock,
      validAgency.idAgency,
    );

    expect(AgencyMock.findByPk).toHaveBeenCalledWith(validAgency.idAgency, {
      include: [
        {
          model: ManagerMock,
          include: [
            {
              model: UserMock,
            },
          ],
        },
      ],
    });
    expect(result).toEqual(validAgency);
  });

  test("TC2- Error Path: Agency null", async () => {
    AgencyMock.findByPk.mockResolvedValue(null);
    await expect(
      AgencyService.getAgencyById(
        AgencyMock,
        ManagerMock,
        UserMock,
        validAgency.idAgency,
      ),
    ).rejects.toThrow("Agency not found");
  });

  test("TC3 - Error Path: Agency undefined", async () => {
    AgencyMock.findByPk.mockResolvedValue(undefined);
    await expect(
      AgencyService.getAgencyById(
        AgencyMock,
        ManagerMock,
        UserMock,
        validAgency.idAgency,
      ),
    ).rejects.toThrow("Agency not found");
  });

  test("TC4 - Error Path: Agency is {} ", async () => {
    AgencyMock.findByPk.mockResolvedValue({});
    await expect(
      AgencyService.getAgencyById(
        AgencyMock,
        ManagerMock,
        UserMock,
        validAgency.idAgency,
      ),
    ).rejects.toThrow();
  });

  test("TC5 - Error Path: Manager null", async () => {
    AgencyMock.findByPk.mockResolvedValue({
      ...validAgency,
      Manager: null,
    });

    const result = await AgencyService.getAgencyById(
      AgencyMock,
      ManagerMock,
      UserMock,
      validAgency.idAgency,
    );
    expect(result).toEqual({
      ...validAgency,
      Manager: null,
    });
  });

  test("TC6 - Error Path: Manager undefined", async () => {
    AgencyMock.findByPk.mockResolvedValue({
      ...validAgency,
      Manager: undefined,
    });

    const result = await AgencyService.getAgencyById(
      AgencyMock,
      ManagerMock,
      UserMock,
      validAgency.idAgency,
    );
    expect(result).toEqual({
      ...validAgency,
      Manager: undefined,
    });
  });

  test("TC7 - Error Path: Manager is {} ", async () => {
    AgencyMock.findByPk.mockResolvedValue({
      ...validAgency,
      Manager: {},
    });

    const result = await AgencyService.getAgencyById(
      AgencyMock,
      ManagerMock,
      UserMock,
      validAgency.idAgency,
    );
    expect(result).toEqual({
      ...validAgency,
      Manager: {},
    });
  });

  test("TC8 - Error Path: User null ", async () => {
    AgencyMock.findByPk.mockResolvedValue({
      ...validAgency,
      Manager: {
        User: null,
      },
    });

    const result = await AgencyService.getAgencyById(
      AgencyMock,
      ManagerMock,
      UserMock,
      validAgency.idAgency,
    );
    expect(result).toEqual({
      ...validAgency,
      Manager: {
        User: null,
      },
    });
  });

  test("TC9 - Error Path: User undefined ", async () => {
    AgencyMock.findByPk.mockResolvedValue({
      ...validAgency,
      Manager: {
        User: undefined,
      },
    });

    const result = await AgencyService.getAgencyById(
      AgencyMock,
      ManagerMock,
      UserMock,
      validAgency.idAgency,
    );
    expect(result).toEqual({
      ...validAgency,
      Manager: { User: undefined },
    });
  });

  test("TC10 - Error Path: User is {} ", async () => {
    AgencyMock.findByPk.mockResolvedValue({
      ...validAgency,
      Manager: {
        User: {},
      },
    });
    const result = await AgencyService.getAgencyById(
      AgencyMock,
      ManagerMock,
      UserMock,
      validAgency.idAgency,
    );
    expect(result).toEqual({
      ...validAgency,
      Manager: { User: {} },
    });
  });

  test("TC11 - Error Path: idAgency is null or undefined or doesn't exist in the database (same behaviour)", async () => {
    AgencyMock.findByPk.mockResolvedValue(null);
    await expect(
      AgencyService.getAgencyById(AgencyMock, ManagerMock, UserMock, 9999),
    ).rejects.toThrow("Agency not found");
  });
});
