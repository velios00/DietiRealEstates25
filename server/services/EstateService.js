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
      type: dto.type,
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
    console.log("🔍 searchEstates chiamato con filters:", filters);
    console.log("📋 pagination:", pagination);

    const whereConditions = this.buildWhereConditions(filters);
    console.log("🎯 WHERE conditions costruite:", whereConditions);
    const { page = 1, limit = 10, orderBy = "price" } = pagination;
    const offset = (page - 1) * limit;

    // 🔍 Se l'utente seleziona una location con autocomplete → ricerca geografica per raggio
    if (filters.lat && filters.lon && filters.radius) {
      console.log(
        `🌍 Ricerca geografica: lat=${filters.lat}, lon=${filters.lon}, radius=${filters.radius}km`,
      );

      // Ottieni TUTTI gli immobili con i filtri (prezzo, stanze, ecc.)
      const allEstates = await RealEstate.findAll({
        where: whereConditions,
        include: [
          {
            model: Place,
            required: true,
          },
        ],
      });

      console.log(
        `📍 Totale immobili trovati con filtri (non geografici): ${allEstates.length}`,
      );

      if (allEstates.length > 0) {
        console.log(`🏷️ Tipo primo immobile: "${allEstates[0].type}"`);
      }
      console.log(`🔍 Filtro type richiesto: "${filters.type}"`);

      // Filtra manualmente per distanza usando Haversine
      const estatesInRadius = allEstates.filter((estate) => {
        const distance = this.calculateDistance(
          filters.lat,
          filters.lon,
          parseFloat(estate.Place.lat),
          parseFloat(estate.Place.lon),
        );
        console.log(
          `  - Immobile: ${estate.title}, lat=${estate.Place.lat}, lon=${estate.Place.lon}, distanza=${distance.toFixed(2)}km`,
        );
        return distance <= filters.radius;
      });

      console.log(`✅ Immobili nel raggio: ${estatesInRadius.length}`);

      // Ordina i risultati
      estatesInRadius.sort((a, b) => {
        if (orderBy === "createdAt") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return a.price - b.price;
      });

      console.log(`🔢 Dopo ordinamento: ${estatesInRadius.length} immobili`);
      console.log(`📄 Paginazione: offset=${offset}, limit=${limit}`);

      // Applica paginazione
      const paginatedEstates = estatesInRadius.slice(offset, offset + limit);

      console.log(`✂️ Dopo slice: ${paginatedEstates.length} immobili`);

      const result = {
        data: paginatedEstates.map((estate) =>
          EstateMapper.estateToDTO(estate),
        ),
        total: estatesInRadius.length,
        page,
        totalPages: Math.ceil(estatesInRadius.length / limit),
      };

      console.log("📦 Risultato da restituire:", {
        dataLength: result.data.length,
        total: result.total,
        page: result.page,
        totalPages: result.totalPages,
      });

      return result;
    }

    // ❌ Altrimenti: ricerca senza filtro geografico (solo filtri come prezzo, stanze, ecc. oppure niente)
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
