import { geoCodeAddress, getPOIs } from "../config/geoapify.js";
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

    let fallbackPhotos;

    if (Array.isArray(dto.photos)) {
      fallbackPhotos = dto.photos;
    } else if (typeof dto.photos === "string") {
      fallbackPhotos = dto.photos
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);
    } else {
      fallbackPhotos = [];
    }

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

    const addressForGeocode = dto.city
      ? `${dto.address}, ${dto.city}`
      : dto.address;
    const geo = await geoCodeAddress(addressForGeocode, apiKey);

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
        city: geo.city || dto.city,
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
      type: dto.type,
      idAgent,
      idAgency: agencyId,
      createdBy,
      idManager,
      idPlace: place.idPlace,
    });
    return newEstate;
  }

  static async getEstateById(Estate, Place, idRealEstate) {
    return await Estate.findByPk(idRealEstate, { include: [Place] });
  }

  static addRangeFilter(whereConditions, field, min, max) {
    if (min != null || max != null) {
      // != checks for both null and undefined
      whereConditions[field] = {};
      if (min != null) {
        whereConditions[field][Op.gte] = min;
      }
      if (max != null) {
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

    // nRooms and nBathrooms are "minimum" filters (>=)
    if (filters.nRooms != null && filters.nRooms > 0) {
      whereConditions.nRooms = { [Op.gte]: filters.nRooms };
    }
    if (filters.nBathrooms != null && filters.nBathrooms > 0) {
      whereConditions.nBathrooms = { [Op.gte]: filters.nBathrooms };
    }

    // energyClass - case insensitive search
    if (filters.energyClass != null) {
      whereConditions.energyClass = { [Op.iLike]: filters.energyClass };
    }

    const simpleFilters = [
      "floor",
      "createdBy",
      "type",
      "idAgency",
      "idAgent",
      "idManager",
    ];

    simpleFilters.forEach((key) => {
      if (filters[key] != null) {
        whereConditions[key] = filters[key];
      }
    });

    return whereConditions;
  }

  // Calcola la distanza in km tra due coordinate usando la formula Haversine
  static calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raggio della Terra in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
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

    if (filters.lat && filters.lon && filters.radius) {
      // Ottieni tutti gli immobili con i filtri (prezzo, stanze, ecc.)
      const allEstates = await RealEstate.findAll({
        where: whereConditions,
        include: [
          {
            model: Place,
            required: true,
          },
        ],
      });

      // Filtra manualmente per distanza usando Haversine
      const estatesInRadius = allEstates.filter((estate) => {
        const distance = this.calculateDistance(
          filters.lat,
          filters.lon,
          parseFloat(estate.Place.lat),
          parseFloat(estate.Place.lon),
        );
        return distance <= filters.radius;
      });

      // Ordina i risultati
      estatesInRadius.sort((a, b) => {
        if (orderBy === "createdAt") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return a.price - b.price;
      });

      // Applica paginazione
      const paginatedEstates = estatesInRadius.slice(offset, offset + limit);

      const result = {
        data: paginatedEstates.map((estate) =>
          EstateMapper.estateToDTO(estate),
        ),
        total: estatesInRadius.length,
        page,
        totalPages: Math.ceil(estatesInRadius.length / limit),
      };

      return result;
    }

    const estates = await RealEstate.findAndCountAll({
      where: whereConditions,
      include: [
        {
          model: Place,
          required: true,
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
