export class EstateService {
    static async createEstate(RealEstate, Agent, Manager, userId, dto) {
        
        let agencyId = null
        let userRole = null 
        const manager = await Manager.findByPk(userId);
        if(manager) {
            agencyId = manager.idAgency;
            userRole = "manager";
        } else {
            const agent = await Agent.findByPk(userId);
            if(agent) {
                agencyId = agent.idAgency;
                userRole = "agent";
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
            idAgent: userId,
            idAgency: agencyId
        })

        if(userRole === "manager") {
            newEstate.idManager = userId;
            newEstate.idAgent = null;
        } else{
            newEstate.idAgent = userId;
            newEstate.idManager = null;
        }

        return newEstate;
    }
}