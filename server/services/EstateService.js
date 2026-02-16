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
    this.validatePrice(dto.price);
    this.validateBathrooms(dto.nBathrooms, dto.nRooms);

    dto.photos = await this.processPhotos(files, dto.photos);
    this.validatePhotos(dto.photos);

    const { agencyId, createdBy, idManager, idAgent } =
      await this.getUserAgencyInfo(Manager, Agent, userId);

    const place = await this.getOrCreatePlace(Place, dto, apiKey);

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

  static validatePhotos(photos) {
    if (!photos || photos.length < 3) {
      throw new Error("Sono richieste almeno 3 foto");
    }
    if (photos.length > 10) {
      throw new Error("Massimo 10 foto consentite");
    }
  }

  static validatePrice(price) {
    if (!price || price <= 0) {
      throw new Error("Il prezzo deve essere maggiore di 0");
    }
    if (!Number.isInteger(Number(price))) {
      throw new Error("Il prezzo deve essere un numero intero");
    }
  }

  static validateBathrooms(nBathrooms, nRooms) {
    const bathrooms = Number(nBathrooms);
    const rooms = Number(nRooms);

    // Controlla che siano numeri validi
    if (isNaN(bathrooms) || isNaN(rooms)) {
      throw new Error("I valori di bagni e locali devono essere numeri validi");
    }

    if (bathrooms >= rooms) {
      throw new Error(
        "Il numero di bagni deve essere inferiore al numero di locali",
      );
    }
  }

  static async processPhotos(files, dtoPhotos) {
    const uploadedPhotos = files?.length
      ? await Promise.all(files.map((file) => ImageService.uploadImage(file)))
      : [];

    if (uploadedPhotos.length) {
      return uploadedPhotos;
    }

    return this.parseFallbackPhotos(dtoPhotos);
  }

  static parseFallbackPhotos(photos) {
    if (Array.isArray(photos)) {
      return photos;
    }
    if (typeof photos === "string") {
      return photos
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);
    }
    return [];
  }

  static async getUserAgencyInfo(Manager, Agent, userId) {
    const manager = await Manager.findByPk(userId);
    if (manager) {
      return {
        agencyId: manager.idAgency,
        createdBy: "manager",
        idManager: manager.idManager,
        idAgent: null,
      };
    }

    const agent = await Agent.findByPk(userId);
    if (agent) {
      return {
        agencyId: agent.idAgency,
        createdBy: "agent",
        idManager: null,
        idAgent: agent.idAgent,
      };
    }

    throw new Error("User is neither a manager nor an agent");
  }

  static async getOrCreatePlace(Place, dto, apiKey) {
    const addressForGeocode = dto.city
      ? `${dto.address}, ${dto.city}`
      : dto.address;
    const geo = await geoCodeAddress(addressForGeocode, apiKey);

    let place = await Place.findOne({
      where: { lat: geo.lat, lon: geo.lon },
    });

    if (!place) {
      const pois = await getPOIs(geo.lat, geo.lon, apiKey);
      place = await Place.create({
        ...geo,
        city: geo.city || dto.city,
        pois: JSON.stringify(pois),
      });
    }

    return place;
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

    // Range filters for price and size
    const effectiveMaxPrice =
      filters.maxPrice === 5000000 ? null : filters.maxPrice;

    this.addRangeFilter(
      whereConditions,
      "price",
      filters.minPrice,
      effectiveMaxPrice,
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
      order: [
        [
          orderBy === "createdAt" ? "createdAt" : "price",
          orderBy === "createdAt" ? "DESC" : "ASC",
        ],
      ],
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
