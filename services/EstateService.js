import { geoCodeAddress, getPOIs } from "../utils/geoapify.js";
import { Op } from "sequelize";

export class EstateService {
    static async createEstate(RealEstate, Agent, Manager, Place, userId, dto, apiKey) {
        
        let agencyId = null;
        let idManager = null;
        let idAgent = null;
        let createdBy = null;

        const manager = await Manager.findByPk(userId);
        if(manager) {                                       //refactor possibile
            agencyId = manager.idAgency;
            createdBy = "manager";
            idManager = manager.idManager;
        } else {
            const agent = await Agent.findByPk(userId);
            if(agent) {
                agencyId = agent.idAgency;
                createdBy = "agent";
                idAgent = agent.idAgent;
            }
        }
        if(!agencyId) {
            throw new Error("User is neither a manager nor an agent");
        }

        const geo = await geoCodeAddress(dto.address, apiKey);

        let place = await Place.findOne({
            where: {
                lat: geo.lat,
                lon: geo.lon
            }
        });
        //Se non esiste crea e aggiungi POI
        if(!place) {
            const pois = await getPOIs(geo.lat, geo.lon, apiKey);

            place = await Place.create({
                ...geo,
                pois: JSON.stringify(pois)
            });
        }

        const newEstate = await RealEstate.create({
            description: dto.description,
            photo: dto.photo,
            price: dto.price,
            size: dto.size,
            idAgent,
            idAgency: agencyId,
            createdBy,
            idManager,
            idPlace: place.idPlace
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
        if (userRole === "manager" && estate.createdBy === "manager" && estate.idManager !== userId) {

        }

        await estate.destroy();
        
        return { message: "Estate deleted successfully" };
    }
        //W.I.P.
        static async getEstateById(Estate, idRealEstate) {
            return await Estate.findByPk(idRealEstate);
        }

        static async searchEstates(RealEstate, Place, filters, EstateMapper) {
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

            if (filters.nRooms !== null) {
                whereConditions.nRooms = filters.nRooms;
            }

            if(filters.nBathrooms !== null) {
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

            const estates = await RealEstate.findAll({
                where: whereConditions,
                include: [{
                    model: Place,
                    where: {
                        city: {
                            [Op.like]: `%${filters.city || ""}%`
                        }
                    },
                    required: true //inner join
                }],
                order: [['price', 'ASC']]
            });

             return estates.map(estate => EstateMapper.estateToDTO(estate));
        }
}