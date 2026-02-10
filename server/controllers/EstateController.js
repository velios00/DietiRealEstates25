import { EstateMapper } from "../mappers/EstateMapper.js";
import { EstateService } from "../services/EstateService.js";
import {
  RealEstate,
  Manager,
  Agent,
  Place,
} from "../models/DietiRealEstatesDB.js";
import { SearchFiltersMapper } from "../mappers/SearchFiltersMapper.js";

export class EstateController {
  static async createEstate(req, res, next) {
    try {
      const userId = req.userId;
      const dto = EstateMapper.toCreateEstateDTO(req.body);

      const created = await EstateService.createEstate(
        RealEstate,
        Agent,
        Manager,
        Place,
        userId,
        dto,
        process.env.API_KEY_GEOAPIFY,
        req.files,
      );

      const estateWithPlace = await RealEstate.findByPk(created.idRealEstate, {
        include: [Place],
      });
      const result = EstateMapper.estateToDTO(estateWithPlace);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async deleteEstate(req, res, next) {
    try {
      const userId = req.userId;
      const estateId = parseInt(req.params.id);

      if (isNaN(estateId)) {
        return res.status(400).json({ error: "Invalid estate ID" });
      }

      await EstateService.deleteEstate(
        RealEstate,
        Agent,
        Manager,
        userId,
        estateId,
      );

      res.status(200).json({ message: "Estate deleted successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async getMyEstates(req, res, next) {
    try {
      const userId = req.userId;

      const pagination = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 100,
        orderBy: req.query.orderBy || "createdAt",
      };

      // Check if user is agent or manager
      const manager = await Manager.findByPk(userId);

      const agent = !manager ? await Agent.findByPk(userId) : null;

      if (!manager && !agent) {
        return res
          .status(403)
          .json({ error: "Only agents and managers can access this endpoint" });
      }

      const allEstates = await RealEstate.findAll({
        attributes: [
          "idRealEstate",
          "title",
          "idManager",
          "idAgent",
          "createdBy",
        ],
        limit: 10,
      });
      console.log(allEstates.map((e) => e.toJSON()));

      // Build filter based on role
      const filters = {};
      if (manager) {
        filters.idManager = manager.idManager;
        filters.createdBy = "manager";
      } else if (agent) {
        filters.idAgent = agent.idAgent;
        filters.createdBy = "agent";
      }

      const estates = await EstateService.searchEstates(
        RealEstate,
        Place,
        filters,
        pagination,
        EstateMapper,
      );

      res.status(200).json({
        count: estates.data.length,
        totalResults: estates.total,
        page: estates.page,
        totalPages: estates.totalPages,
        results: estates.data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getEstateById(req, res, next) {
    try {
      const estateId = parseInt(req.params.id);
      if (isNaN(estateId)) {
        return res.status(400).json({ error: "Invalid estate ID" });
      }

      const estate = await EstateService.getEstateById(
        RealEstate,
        Place,
        req.params.id,
      );

      if (!estate) {
        return res.status(404).json({ message: "Estate not found" });
      }

      const result = EstateMapper.estateToDTO(estate);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async searchEstates(req, res, next) {
    try {
      const filters = SearchFiltersMapper.fromQuery(req.query);

      const pagination = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        orderBy: req.query.orderBy || "price",
      };

      const estates = await EstateService.searchEstates(
        RealEstate,
        Place,
        filters,
        pagination,
        EstateMapper,
      );

      res.status(200).json({
        count: estates.data.length,
        totalResults: estates.total,
        page: estates.page,
        totalPages: estates.totalPages,
        city: filters.city,
        filters: SearchFiltersMapper.toResponse(filters),
        results: estates.data,
      });
    } catch (err) {
      next(err);
    }
  }
}
