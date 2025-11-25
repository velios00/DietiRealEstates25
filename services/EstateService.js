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
            throw new Error("User is neigher a manager nor an agent");
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
}