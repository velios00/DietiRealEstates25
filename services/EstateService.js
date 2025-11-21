export class EstateService {
    static async createEstate(RealEstate, Agent, Manager, userId, dto) {
        
        let agencyId = null
        const manager = await Manager.findByPk(userId);
        if(manager) {
            agencyId = manager.idAgency;
        } else {
            const agent = await Agent.findByPk(userId);
            if(agent) {
                agencyId = agent.idAgency;
            }
        }
        if(!agencyId) {
            throw new Error("User is neigher a manager nor an agent");
        }

        console.log("price", dto.price)

        const newEstate = await RealEstate.create({
            description: dto.description,
            photo: dto.photo,
            price: dto.price,
            size: dto.size,
            idAgency: agencyId
        })
        return newEstate;
    }
}