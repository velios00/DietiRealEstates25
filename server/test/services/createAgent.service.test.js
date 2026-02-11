import { describe, test, expect, beforeEach, jest } from "@jest/globals";

const randomaticMock = jest.fn(() => "TestPass123");
const sendWelcomeEmailMock = jest.fn().mockResolvedValue(true);

await jest.unstable_mockModule("randomatic", () => ({
  default: randomaticMock,
}));
await jest.unstable_mockModule("../../config/mailer", () => ({
  EmailTemplates: {
    sendWelcomeEmail: sendWelcomeEmailMock,
  },
}));

const { AgentService } = await import("../../services/AgentService");

describe("AgentService - createAgent", () => {
  let UserMock;
  let AgentMock;
  let ManagerMock;
  let validDto;

  beforeEach(() => {
    jest.clearAllMocks();

    randomaticMock.mockReturnValue("TestPass123");
    sendWelcomeEmailMock.mockResolvedValue(true);

    UserMock = {
      findOne: jest.fn(),
      create: jest.fn(),
    };

    AgentMock = {
      create: jest.fn(),
    };

    ManagerMock = {
      findByPk: jest.fn(),
    };

    validDto = {
      email: "pipo@gmail.com",
      name: "Simone",
      surname: "Veniero",
      profileImage: "https://example.com/image.jpg",
    };
  });

  test("TC1 - Happy path: create agent successfully", async () => {
    const managerId = 10;
    const mockUserCreated = {
      idUser: 100,
      email: "pipo@gmail.com",
      name: "Simone",
      surname: "Veniero",
      role: "agent",
    };

    const mockAgentCreated = {
      idAgent: 100,
      idManager: managerId,
      idAgency: 5,
    };
    const mockManager = {
      idManager: managerId,
      idAgency: 5,
    };

    UserMock.findOne.mockResolvedValue(null);
    UserMock.create.mockResolvedValue(mockUserCreated);
    ManagerMock.findByPk.mockResolvedValue(mockManager);
    AgentMock.create.mockResolvedValue(mockAgentCreated);

    const result = await AgentService.createAgent(
      UserMock,
      AgentMock,
      ManagerMock,
      managerId,
      validDto,
    );

    expect(UserMock.findOne).toHaveBeenCalledWith({
      where: { email: validDto.email },
    });
    expect(UserMock.create).toHaveBeenCalledWith({
      email: "pipo@gmail.com",
      password: "TestPass123",
      name: "Simone",
      surname: "Veniero",
      profileImage: "https://example.com/image.jpg",
      role: "agent",
    });

    expect(ManagerMock.findByPk).toHaveBeenCalledWith(10);
    expect(AgentMock.create).toHaveBeenCalledWith({
      idAgent: 100,
      idManager: 10,
      idAgency: 5,
    });
    expect(sendWelcomeEmailMock).toHaveBeenCalledWith(
      "pipo@gmail.com",
      "Simone",
      "agent",
      null,
      "TestPass123",
    );
    expect(result).toEqual({
      user: mockUserCreated,
      agent: mockAgentCreated,
    });
  });
});
