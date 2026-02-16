import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { UserService } from "../../services/UserService.js";

describe("UserService.getUserById - R-WECT", () => {
  let UserMock;

  beforeEach(() => {
    jest.clearAllMocks();

    UserMock = {
      findByPk: jest.fn(),
    };
  });

  test("TC1 - Happy path: get user by id", async () => {
    const mockUser = {
      idUser: 1,
      name: "John",
      surname: "Doe",
      email: "john@test.com",
    };

    UserMock.findByPk.mockResolvedValue(mockUser);

    const result = await UserService.getUserById(UserMock, 1);

    expect(UserMock.findByPk).toHaveBeenCalledWith(1, {
      attributes: { exclude: ["password"] },
    });
    expect(result).toEqual(mockUser);
  });

  test("TC2 - Happy path: user not found returns null", async () => {
    UserMock.findByPk.mockResolvedValue(null);

    const result = await UserService.getUserById(UserMock, 999);

    expect(result).toBeNull();
  });

  test("TC3 - Happy path: user not found returns undefined", async () => {
    UserMock.findByPk.mockResolvedValue(undefined);

    const result = await UserService.getUserById(UserMock, 999);

    expect(result).toBeUndefined();
  });
});
