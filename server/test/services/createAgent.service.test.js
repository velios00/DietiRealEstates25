import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { AgentService } from "../../services/AgentService";

describe("AgentService, R-WECT", () => {
  const validUserModel = { findOne: jest.fn(), create: jest.fn() };
  const validAgentModel = { create: jest.fn() };
  const validManagerModel = { findByPk: jest.fn() };

  const validDto = {
    email: "pipo@gmail.com",
    name: "Simone",
    surname: "Veniero",
  };

  const validManagerId = 10;

  beforeEach(() => {
    jest.clearAllMocks();

    validUserModel.findOne.mockResolvedValue(null);
    validUserModel.create.mockResolvedValue({ idUser: 1 });

    validManagerModel.findByPk.mockResolvedValue({ idAgency: 5 });
    validAgentModel.create.mockResolvedValue({ idAgent: 1 });
  });

  test("TC1 - Happy path: create agent successfully", async () => {
    const result = await AgentService.createAgent(
      validUserModel,
      validAgentModel,
      validManagerModel,
      validManagerId,
      validDto,
    );

    expect(validUserModel.create).toHaveBeenCalled();
    expect(validAgentModel.create).toHaveBeenCalled();

    expect(result).toHaveProperty("user");
    expect(result).toHaveProperty("agent");
  });

  test("TC2 - Error Path: User null", async () => {
    await expect(
      AgentService.createAgent(
        null,
        validAgentModel,
        validManagerModel,
        validManagerId,
        validDto,
      ),
    ).rejects.toThrow();
  });

  test("TC3 - Error Path: Agent null", async () => {
    await expect(
      AgentService.createAgent(
        validUserModel,
        null,
        validManagerModel,
        validManagerId,
        validDto,
      ),
    ).rejects.toThrow();
  });

  test("TC4 - Error Path: Manager null", async () => {
    await expect(
      AgentService.createAgent(
        validUserModel,
        validAgentModel,
        null,
        validManagerId,
        validDto,
      ),
    ).rejects.toThrow();
  });

  test("TC5 - Error Path: idManager null or undefined or not present in the db (same behaviour)", async () => {
    validManagerModel.findByPk.mockResolvedValue(null);

    await expect(
      AgentService.createAgent(
        validUserModel,
        validAgentModel,
        validManagerModel,
        null,
        validDto,
      ),
    ).rejects.toThrow("Manager not found");
  });

  test("TC6 - Error Path: Email already exists", async () => {
    validUserModel.findOne.mockResolvedValue({ idUser: 1 });

    await expect(
      AgentService.createAgent(
        validUserModel,
        validAgentModel,
        validManagerModel,
        validManagerId,
        { ...validDto, email: "pipi@gmail.com" },
      ),
    ).rejects.toThrow("Email already exists");
  });

  test("TC7 - Error Path: Email null or undefined (same behaviour)", async () => {
    await expect(
      AgentService.createAgent(
        validUserModel,
        validAgentModel,
        validManagerModel,
        validManagerId,
        { ...validDto, email: null },
      ),
    ).rejects.toThrow("Email is required");
  });

  test("TC8 - Error Path: Email empty string", async () => {
    await expect(
      AgentService.createAgent(
        validUserModel,
        validAgentModel,
        validManagerModel,
        validManagerId,
        { ...validDto, email: "" },
      ),
    ).rejects.toThrow("Email is required");
  });

  test("TC9 - Error Path: Name null or undefined (same behaviour)", async () => {
    await expect(
      AgentService.createAgent(
        validUserModel,
        validAgentModel,
        validManagerModel,
        validManagerId,
        { ...validDto, name: null },
      ),
    ).rejects.toThrow("Name is required");
  });

  test("TC10 - Error Path: name empty string", async () => {
    await expect(
      AgentService.createAgent(
        validUserModel,
        validAgentModel,
        validManagerModel,
        validManagerId,
        { ...validDto, name: "" },
      ),
    ).rejects.toThrow("Name is required");
  });

  test("TC11 - Error Path: surname null or undefined (same behaviour)", async () => {
    await expect(
      AgentService.createAgent(
        validUserModel,
        validAgentModel,
        validManagerModel,
        validManagerId,
        { ...validDto, surname: null },
      ),
    ).rejects.toThrow("Surname is required");
  });

  test("TC12 - Error Path: surname empty string", async () => {
    await expect(
      AgentService.createAgent(
        validUserModel,
        validAgentModel,
        validManagerModel,
        validManagerId,
        { ...validDto, surname: "" },
      ),
    ).rejects.toThrow("Surname is required");
  });

  test("TC15 - Error Path: User undefined", async () => {
    await expect(
      AgentService.createAgent(
        undefined,
        validAgentModel,
        validManagerModel,
        validManagerId,
        validDto,
      ),
    ).rejects.toThrow();
  });

  test("TC16 - Error Path: User is {}", async () => {
    validUserModel.create.mockResolvedValue({});

    await expect(
      AgentService.createAgent(
        validUserModel,
        validAgentModel,
        validManagerModel,
        validManagerId,
        validDto,
      ),
    ).rejects.toThrow("User not created");
  });

  test("TC17 - Error Path: Agent undefined", async () => {
    await expect(
      AgentService.createAgent(
        validUserModel,
        undefined,
        validManagerModel,
        validManagerId,
        validDto,
      ),
    ).rejects.toThrow();
  });

  test("TC18 - Error Path: Agent is {}", async () => {
    validAgentModel.create.mockResolvedValue({});

    await expect(
      AgentService.createAgent(
        validUserModel,
        validAgentModel,
        validManagerModel,
        validManagerId,
        validDto,
      ),
    ).rejects.toThrow();
  });

  test("TC19 - Error Path: Manager undefined", async () => {
    await expect(
      AgentService.createAgent(
        validUserModel,
        validAgentModel,
        undefined,
        validManagerId,
        validDto,
      ),
    ).rejects.toThrow();
  });

  test("TC20 - Error Path: Manager is {}", async () => {
    validManagerModel.findByPk.mockResolvedValue({});
    await expect(
      AgentService.createAgent(
        validUserModel,
        validAgentModel,
        validManagerModel,
        validManagerId,
        validDto,
      ),
    ).rejects.toThrow();
  });
});
