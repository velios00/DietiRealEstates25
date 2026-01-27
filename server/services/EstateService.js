import { geoCodeAddress, getPOIs } from "../utils/geoapify.js";
import { ImageService } from "./ImageService.js";
import { Op } from "sequelize";

export class EstateService {
  static async createEstate(
    RealEstate,
    Agent,
    Manager,
    Place,
    userId,
    dto,
    apiKey,
    files,
  ) {
    // Handle image uploads and fallback to body photos
    const uploadedPhotos = files?.length
      ? await Promise.all(files.map((file) => ImageService.uploadImage(file)))
      : [];

    const fallbackPhotos = Array.isArray(dto.photos)
      ? dto.photos
      : typeof dto.photos === "string"
        ? dto.photos
            .split(",")
            .map((p) => p.trim())
            .filter(Boolean)
        : [];

    dto.photos = uploadedPhotos.length ? uploadedPhotos : fallbackPhotos;

    let agencyId = null;
    let idManager = null;
    let idAgent = null;
    let createdBy = null;

    const manager = await Manager.findByPk(userId);
    if (manager) {
      //refactor possibile
      agencyId = manager.idAgency;
      createdBy = "manager";
      idManager = manager.idManager;
    } else {
      const agent = await Agent.findByPk(userId);
      if (agent) {
        agencyId = agent.idAgency;
        createdBy = "agent";
        idAgent = agent.idAgent;
      }
    }
    if (!agencyId) {
      throw new Error("User is neither a manager nor an agent");
    }
    console.log("CreatedBy:", createdBy);
    const geo = await geoCodeAddress(dto.address, apiKey);

    let place = await Place.findOne({
      where: {
        lat: geo.lat,
        lon: geo.lon,
      },
    });
    //Se non esiste crea e aggiungi POI
    if (!place) {
      const pois = await getPOIs(geo.lat, geo.lon, apiKey);

      place = await Place.create({
        ...geo,
        pois: JSON.stringify(pois),
      });
    }

    const newEstate = await RealEstate.create({
      title: dto.title,
      description: dto.description,
      photos: dto.photos,
      price: dto.price,
      size: dto.size,
      nRooms: dto.nRooms,
      nBathrooms: dto.nBathrooms,
      energyClass: dto.energyClass,
      floor: dto.floor,
      idAgent,
      idAgency: agencyId,
      createdBy,
      idManager,
      idPlace: place.idPlace,
    });
    return newEstate;
  }

  static async deleteEstate(RealEstate, Agent, Manager, userId, estateId) {
    // Find the estate first
    const estate = await RealEstate.findByPk(estateId);

    if (!estate) {
      throw new Error("Estate not found");
    }

    let userAgencyId = null;
    let userRole = null;

    const manager = await Manager.findByPk(userId);
    if (manager) {
      userAgencyId = manager.idAgency;
      userRole = "manager";
    } else {
      const agent = await Agent.findByPk(userId);
      if (agent) {
        userAgencyId = agent.idAgency;
        userRole = "agent";
      }
    }

    if (!userAgencyId) {
      throw new Error("User is neither a manager nor an agent");
    }

    if (estate.idAgency !== userAgencyId) {
      throw new Error("You can only delete estates from your own agency");
    }

    if (userRole === "agent" && estate.idAgent !== userId) {
      throw new Error("Agents can only delete estates they created");
    }

    if (
      userRole === "manager" &&
      estate.createdBy === "manager" &&
      estate.idManager !== userId
    ) {
    }

    await estate.destroy();

    return { message: "Estate deleted successfully" };
  }

  static async getEstateById(Estate, Place, idRealEstate) {
    return await Estate.findByPk(idRealEstate, { include: [Place] });
  }

  static addRangeFilter(whereConditions, field, min, max) {
    if (min !== null || max !== null) {
      whereConditions[field] = {};
      if (min !== null) {
        whereConditions[field][Op.gte] = min;
      }
      if (max !== null) {
        whereConditions[field][Op.lte] = max;
      }
    }
  }

  static buildWhereConditions(filters) {
    const whereConditions = {};

    // Range filters
    this.addRangeFilter(
      whereConditions,
      "price",
      filters.minPrice,
      filters.maxPrice,
    );
    this.addRangeFilter(
      whereConditions,
      "size",
      filters.minSize,
      filters.maxSize,
    );

    const simpleFilters = [
      "nRooms",
      "nBathrooms",
      "energyClass",
      "floor",
      "createdBy",
      "type",
      "idAgency",
    ];

    simpleFilters.forEach((key) => {
      if (filters[key] != null) {
        whereConditions[key] = filters[key];
      }
    });

    return whereConditions;
  }

  static async searchEstates(
    RealEstate,
    Place,
    filters,
    pagination,
    EstateMapper,
  ) {
    const whereConditions = this.buildWhereConditions(filters);

    const { page = 1, limit = 10, orderBy = "price" } = pagination;
    const offset = (page - 1) * limit;

    const estates = await RealEstate.findAndCountAll({
      where: whereConditions,
      include: [
        {
          model: Place,
          where: {
            city: {
              [Op.like]: `%${filters.city || ""}%`,
            },
          },
          required: true, //inner join
        },
      ],
      order: [[orderBy === "createdAt" ? "createdAt" : "price", "ASC"]],
      limit: limit,
      offset: offset,
    });

    return {
      data: estates.rows.map((estate) => EstateMapper.estateToDTO(estate)),
      total: estates.count,
      page,
      totalPages: Math.ceil(estates.count / limit),
    };
  }
}
