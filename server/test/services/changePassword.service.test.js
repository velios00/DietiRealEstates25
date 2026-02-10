import { UserService } from "../../services/UserService";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { ChangePasswordDTO } from "../../DTOs/UserDTO";

describe("UserService - changePassword", () => {
  let UserMock;
  let userInstance;

  beforeEach(() => {
    jest.clearAllMocks();

    userInstance = {
      password: "oldHashed",
      save: jest.fn().mockResolvedValue(true),
    };

    UserMock = {
      findByPk: jest.fn(),
      build: jest.fn(),
    };
  });

  test("TC1 - Happy path: change password successfully", async () => {
    UserMock.build.mockReturnValue({ password: "oldHashed" });

    UserMock.findByPk.mockResolvedValue(userInstance);

    const dto = new ChangePasswordDTO({
      oldPassword: "*Pippo00",
      newPassword: "*Piponiaco00",
    });

    const result = await UserService.changePassword(UserMock, dto, 10);

    expect(UserMock.findByPk).toHaveBeenCalledWith(10);
    expect(userInstance.save).toHaveBeenCalled();
    expect(userInstance.password).toBe("*Piponiaco00");
    expect(result).toEqual({ message: "Password changed successfully" });
  });

  test("TC2 - Error path: User null", async () => {
    UserMock.findByPk.mockResolvedValue(null);

    const dto = new ChangePasswordDTO({
      oldPassword: "*Pippo00",
      newPassword: "*Piponiaco00",
    });

    await expect(
      UserService.changePassword(UserMock, dto, 10),
    ).rejects.toThrow();
  });

  test("TC3 - Error path: Old password incorrect", async () => {
    UserMock.build.mockReturnValue({ password: "differentHash" });

    UserMock.findByPk.mockResolvedValue(userInstance);

    const dto = new ChangePasswordDTO({
      oldPassword: "*Pipopazzo90",
      newPassword: "*Piponiaco00",
    });

    await expect(UserService.changePassword(UserMock, dto, 10)).rejects.toThrow(
      "Old password is incorrect",
    );
    expect(userInstance.save).not.toHaveBeenCalled();
  });

  test("TC4 - Error path: Old password is null", async () => {
    UserMock.build.mockReturnValue({ password: null });
    UserMock.findByPk.mockResolvedValue(userInstance);

    const dto = new ChangePasswordDTO({
      oldPassword: null,
      newPassword: "*Piponiaco00",
    });

    await expect(
      UserService.changePassword(UserMock, dto, 10),
    ).rejects.toThrow();
    expect(userInstance.save).not.toHaveBeenCalled();
  });

  test("TC5 - Error path: Old password is undefined", async () => {
    UserMock.build.mockReturnValue({ password: undefined });
    UserMock.findByPk.mockResolvedValue(userInstance);

    const dto = new ChangePasswordDTO({
      oldPassword: undefined,
      newPassword: "*Piponiaco00",
    });

    await expect(
      UserService.changePassword(UserMock, dto, 10),
    ).rejects.toThrow();
    expect(userInstance.save).not.toHaveBeenCalled();
  });

  test("TC6 - Error path: Old password is empty string", async () => {
    UserMock.build.mockReturnValue({ password: "" });
    UserMock.findByPk.mockResolvedValue(userInstance);
    const dto = new ChangePasswordDTO({
      oldPassword: "",
      newPassword: "*Piponiaco00",
    });

    await expect(
      UserService.changePassword(UserMock, dto, 10),
    ).rejects.toThrow();
    expect(userInstance.save).not.toHaveBeenCalled();
  });

  test("TC7 - Error path: New password is null", async () => {
    UserMock.build.mockReturnValue({ password: "oldHashed" });
    UserMock.findByPk.mockResolvedValue(userInstance);

    const dto = new ChangePasswordDTO({
      oldPassword: "*Pippo00",
      newPassword: null,
    });

    const result = await UserService.changePassword(UserMock, dto, 10);

    expect(userInstance.password).toBe(null);
    expect(userInstance.save).toHaveBeenCalled();
  });

  test("TC8 - Error path: New password is undefined", async () => {
    UserMock.build.mockReturnValue({ password: "oldHashed" });
    UserMock.findByPk.mockResolvedValue(userInstance);

    const dto = new ChangePasswordDTO({
      oldPassword: "*Pippo00",
      newPassword: undefined,
    });

    const result = await UserService.changePassword(UserMock, dto, 10);

    expect(userInstance.password).toBe(undefined);
    expect(userInstance.save).toHaveBeenCalled();
  });

  test("TC9 - Error path: New password is empty string", async () => {
    UserMock.build.mockReturnValue({ password: "oldHashed" });
    UserMock.findByPk.mockResolvedValue(userInstance);

    const dto = new ChangePasswordDTO({
      oldPassword: "*Pippo00",
      newPassword: "",
    });

    const result = await UserService.changePassword(UserMock, dto, 10);

    expect(userInstance.password).toBe("");
    expect(userInstance.save).toHaveBeenCalled();
  });

  test("TC10 - Error path: idUser not found", async () => {
    UserMock.findByPk.mockResolvedValue(null);

    const dto = new ChangePasswordDTO({
      oldPassword: "*Pippo00",
      newPassword: "*Piponiaco00",
    });

    await expect(
      UserService.changePassword(UserMock, dto, 9999),
    ).rejects.toThrow();
  });

  test("TC11 - Error path: idUser is Null", async () => {
    UserMock.findByPk.mockResolvedValue(null);

    const dto = new ChangePasswordDTO({
      oldPassword: "*Pippo00",
      newPassword: "*Piponiaco00",
    });

    await expect(
      UserService.changePassword(UserMock, dto, null),
    ).rejects.toThrow();
  });

  test("TC12 - Error path: idUser is Undefined", async () => {
    UserMock.findByPk.mockResolvedValue(null);

    const dto = new ChangePasswordDTO({
      oldPassword: "*Pippo00",
      newPassword: "*Piponiaco00",
    });

    await expect(
      UserService.changePassword(UserMock, dto, undefined),
    ).rejects.toThrow();
  });

  test("TC13 - Error path: idUser is String", async () => {
    UserMock.findByPk.mockResolvedValue(null);

    const dto = new ChangePasswordDTO({
      oldPassword: "*Pippo00",
      newPassword: "*Piponiaco00",
    });
    await expect(
      UserService.changePassword(UserMock, dto, "abc"),
    ).rejects.toThrow();
  });

  test("TC14: Error path: idUser is Negative", async () => {
    UserMock.findByPk.mockResolvedValue(null);

    const dto = new ChangePasswordDTO({
      oldPassword: "*Pippo00",
      newPassword: "*Piponiaco00",
    });

    await expect(
      UserService.changePassword(UserMock, dto, -1),
    ).rejects.toThrow();
  });
});
