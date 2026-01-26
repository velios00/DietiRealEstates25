import { geoCodeAddress, getPOIs } from "../utils/geoapify.js";
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
  ) {
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

    // Check if user is manager or agent and get their agency
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

    //IF this is a "generic" remove function these checks need to be deleted i guess.

    // Check if the estate belongs to the user's agency
    if (estate.idAgency !== userAgencyId) {
      throw new Error("You can only delete estates from your own agency");
    }

    //If user is an agent, they can only delete estates they created
    if (userRole === "agent" && estate.idAgent !== userId) {
      throw new Error("Agents can only delete estates they created");
    }

    //If user is a manager, they can only delete estates they created or estates from their agency
    if (
      userRole === "manager" &&
      estate.createdBy === "manager" &&
      estate.idManager !== userId
    ) {
    }

    await estate.destroy();

    return { message: "Estate deleted successfully" };
  }
  //W.I.P.
  static async getEstateById(Estate, idRealEstate) {
    return await Estate.findByPk(idRealEstate);
  }

  static async searchEstates(
    RealEstate,
    Place,
    filters,
    pagination,
    EstateMapper,
  ) {
    const whereConditions = {};

    //refactorare in un altro file questa
    if (filters.minPrice !== null || filters.maxPrice !== null) {
      whereConditions.price = {};
      if (filters.minPrice !== null) {
        whereConditions.price[Op.gte] = filters.minPrice;
      }
      if (filters.maxPrice !== null) {
        whereConditions.price[Op.lte] = filters.maxPrice;
      }
    }
    //Forse cambiare !== con !=
    if (filters.nRooms !== null) {
      whereConditions.nRooms = filters.nRooms;
    }

    // Aggiungi filtro per idAgency se presente
    if (filters.idAgency != null) {
      whereConditions.idAgency = filters.idAgency;
    }

    if (filters.nBathrooms !== null) {
      whereConditions.nBathrooms = filters.nBathrooms;
    }

    if (filters.minSize !== null || filters.maxSize !== null) {
      whereConditions.size = {};
      if (filters.minSize !== null) {
        whereConditions.size[Op.gte] = filters.minSize;
      }
      if (filters.maxSize !== null) {
        whereConditions.size[Op.lte] = filters.maxSize;
      }
    }

    if (filters.energyClass !== null) {
      whereConditions.energyClass = filters.energyClass;
    }

    if (filters.floor !== null) {
      whereConditions.floor = filters.floor;
    }

    if (filters.createdBy != null) {
      whereConditions.createdBy = filters.createdBy;
    }

    if (filters.type != null) {
      whereConditions.type = filters.type;
    }

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

  static async getEstatesByAgency(
    RealEstate,
    Place,
    agencyId,
    pagination = {},
    EstateMapper,
  ) {
    const { page = 1, limit = 10, orderBy = "price" } = pagination;
    const offset = (page - 1) * limit;

    const estates = await RealEstate.findAndCountAll({
      where: {
        idAgency: agencyId,
      },
      include: [
        {
          model: Place,
          required: false, // left join
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
