import { UserService } from "../../services/UserService";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { ChangePasswordDTO } from "../../DTOs/UserDTO";

describe("changePassword - R-WECT", () => {
  let UserMock;

  const validUser = {
    idUser: 10,
    password: "hashed*Pippopaz00",
  };

  const validDto = new ChangePasswordDTO({
    oldPassword: "*Pippopaz00",
    newPassword: "*Pipopazzo90",
  });

  beforeEach(() => {
    jest.clearAllMocks();

    UserMock = {
      findByPk: jest.fn(),
      build: jest.fn().mockReturnValue({ password: "hashed*Pippopaz00" }),
    };
  });

  test("TC1 - Happy path: change password successfully", async () => {
    UserMock.findByPk.mockResolvedValue({
      ...validUser,
      save: jest.fn().mockResolvedValue(),
    });

    const result = await UserService.changePassword(
      UserMock,
      validDto,
      validUser.idUser,
    );

    expect(UserMock.findByPk).toHaveBeenCalledWith(validUser.idUser);
    expect(result).toEqual({ message: "Password changed successfully" });
  });

  test("TC2 -Error Path: User is null", async () => {
    UserMock.findByPk.mockResolvedValue(null);

    await expect(
      UserService.changePassword(UserMock, validDto, validUser.idUser),
    ).rejects.toThrow("User not found");
  });

  test("TC3 - Error Path: User is undefined", async () => {
    UserMock.findByPk.mockResolvedValue(undefined);

    await expect(
      UserService.changePassword(UserMock, validDto, validUser.idUser),
    ).rejects.toThrow("User not found");
  });

  test("TC4 - Error Path: User is {} ", async () => {
    UserMock.findByPk.mockResolvedValue({});

    await expect(
      UserService.changePassword(UserMock, validDto, validUser.idUser),
    ).rejects.toThrow();
  });

  test("TC5 - Error Path: old password is incorrect", async () => {
    UserMock.findByPk.mockResolvedValue({
      ...validUser,
      save: jest.fn().mockResolvedValue(),
    });
    UserMock.build.mockReturnValue({ password: "hashedWrongOldPassword" });

    const invalidDto = new ChangePasswordDTO({
      oldPassword: "WrongOldPassword",
      newPassword: "*Pipopazzo90",
    });

    await expect(
      UserService.changePassword(UserMock, invalidDto, validUser.idUser),
    ).rejects.toThrow("Old password is incorrect");
  });

  test("TC6 - Error Path: old password is undefined or null (same behaviour)", async () => {
    UserMock.findByPk.mockResolvedValue({
      ...validUser,
      save: jest.fn().mockResolvedValue(),
    });
    UserMock.build.mockReturnValue({ password: "hashedUndefinedPassword" });

    const invalidDto = new ChangePasswordDTO({
      oldPassword: undefined,
      newPassword: "*Pipopazzo90",
    });

    await expect(
      UserService.changePassword(UserMock, invalidDto, validUser.idUser),
    ).rejects.toThrow();
  });

  test("TC7 - Error Path: old password is empty string", async () => {
    UserMock.findByPk.mockResolvedValue({
      ...validUser,
      save: jest.fn().mockResolvedValue(),
    });
    UserMock.build.mockReturnValue({ password: "hashedEmptyPassword" });

    const invalidDto = new ChangePasswordDTO({
      oldPassword: "",
      newPassword: "*Pipopazzo90",
    });

    await expect(
      UserService.changePassword(UserMock, invalidDto, validUser.idUser),
    ).rejects.toThrow("Old password is incorrect");
  });

  test("TC8 -Error Path: newPassword is too short", async () => {
    UserMock.findByPk.mockResolvedValue({
      ...validUser,
      save: jest.fn().mockResolvedValue(),
    });
    const invalidDto = new ChangePasswordDTO({
      oldPassword: "*Pippopaz00",
      newPassword: "*Pipo90",
    });

    await expect(
      UserService.changePassword(UserMock, invalidDto, validUser.idUser),
    ).rejects.toThrow("Invalid new password");
  });

  test("TC9 - Error Path: newPassword missing uppercase letter", async () => {
    UserMock.findByPk.mockResolvedValue({
      ...validUser,
      save: jest.fn().mockResolvedValue(),
    });
    const invalidDto = new ChangePasswordDTO({
      oldPassword: "*Pippopaz00",
      newPassword: "*pipo90000",
    });

    await expect(
      UserService.changePassword(UserMock, invalidDto, validUser.idUser),
    ).rejects.toThrow("Invalid new password");
  });

  test("TC10 - Error Path: newPassword missing lowercase letter", async () => {
    UserMock.findByPk.mockResolvedValue({
      ...validUser,
      save: jest.fn().mockResolvedValue(),
    });
    const invalidDto = new ChangePasswordDTO({
      oldPassword: "*Pippopaz00",
      newPassword: "*PIPOOOOO90",
    });

    await expect(
      UserService.changePassword(UserMock, invalidDto, validUser.idUser),
    ).rejects.toThrow("Invalid new password");
  });

  test("TC11 - Error Path: newPassword missing number", async () => {
    UserMock.findByPk.mockResolvedValue({
      ...validUser,
      save: jest.fn().mockResolvedValue(),
    });
    const invalidDto = new ChangePasswordDTO({
      oldPassword: "*Pippopaz00",
      newPassword: "*Pipononono",
    });

    await expect(
      UserService.changePassword(UserMock, invalidDto, validUser.idUser),
    ).rejects.toThrow("Invalid new password");
  });

  test("TC12 - Error Path: newPassword missing special character", async () => {
    UserMock.findByPk.mockResolvedValue({
      ...validUser,
      save: jest.fn().mockResolvedValue(),
    });
    const invalidDto = new ChangePasswordDTO({
      oldPassword: "*Pippopaz00",
      newPassword: "Pipooazzo90",
    });

    await expect(
      UserService.changePassword(UserMock, invalidDto, validUser.idUser),
    ).rejects.toThrow("Invalid new password");
  });

  test("TC13 - Error Path: newPassword is null or undefined (same behaviour)", async () => {
    UserMock.findByPk.mockResolvedValue({
      ...validUser,
      save: jest.fn().mockResolvedValue(),
    });
    const invalidDto = new ChangePasswordDTO({
      oldPassword: "*Pippopaz00",
      newPassword: null,
    });

    await expect(
      UserService.changePassword(UserMock, invalidDto, validUser.idUser),
    ).rejects.toThrow("Invalid new password");
  });

  test("TC14 - Error Path: idUser doesn't exist in database(null or undefined same behaviour)", async () => {
    UserMock.findByPk.mockResolvedValue(null);

    await expect(
      UserService.changePassword(UserMock, validDto, validUser.idUser),
    ).rejects.toThrow("User not found");
  });
});
