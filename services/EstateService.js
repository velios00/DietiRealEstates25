export class EstateService {
    static async createEstate(RealEstate, Agent, Manager, userId, dto) {
        
        let agencyId = null;
        let idManager = null;
        let idAgent = null;
        let createdBy = null;

        const manager = await Manager.findByPk(userId);
        if(manager) {
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

        console.log("id", agencyId)

        const newEstate = await RealEstate.create({
            description: dto.description,
            photo: dto.photo,
            price: dto.price,
            size: dto.size,
            idAgent,
            idAgency: agencyId,
            createdBy,
            idManager
        });
        console.log("nuova estate creata", newEstate)
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
        static async getEstateById(User, idUser) {
            return await Estate.findByPk(idRealEstate);
        }
}