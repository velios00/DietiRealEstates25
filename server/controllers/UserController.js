import { UserService } from "../services/UserService.js";
import { UserMapper } from "../mappers/UserMapper.js";
import { ChangePasswordDTO } from "../DTOs/UserDTO.js";
import { User, Admin, Agent, Manager } from "../models/DietiRealEstatesDB.js";

export class UserController {
  static async changePassword(req, res, next) {
    try {
      const dto = new ChangePasswordDTO(req.body);

      const result = await UserService.changePassword(User, dto, req.userId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const user = await UserService.getUserById(User, req.params.idUser);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const result = UserMapper.toUserDTO(user);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers(User);
      const result = UserMapper.toUserDTOList(users);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async createAdmin(req, res, next) {
    try {
      const dto = new createAdminDTO(req.body);
      const admin = await UserService.createAdmin(User, Admin, dto);
      const result = UserMapper.toUserDTO(admin);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getAllAdmins(req, res, next) {
    try {
      const admins = await UserService.getAllAdmins(Admin);
      const result = UserMapper.toUserDTOList(admins);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getUserAgencyId(req, res, next) {
    try {
      const { idUser } = req.params;

      const agencyId = await UserService.getUserAgencyId(
        User,
        Agent,
        Manager,
        parseInt(idUser),
      );

      res.status(200).json({ idAgency: agencyId });
    } catch (err) {
      next(err);
    }
  }
}
