import randomatic from "randomatic";

export class AgentService {
    static async createAgent(User, Agent, Manager, ManagerId, dto) {
        const randomPassword = randomatic("Aa0", 10);

        const newUser = await User.create({
            email: dto.email,
            password: randomPassword,
            name: dto.name,
            surname: dto.surname,
            profileImage: dto.profileImage,
            role: "agent"
        });

        //console.log("User", newUser);
        //Trova l'agenzia associata al manager
        const manager = await Manager.findByPk(ManagerId);
        if (!manager) {
            throw new Error("Manager not found");
        }
        //console.log("Manager", manager);
        const agencyId = manager.idAgency;
        console.log("Agency ID:", agencyId);
        // devo anche aggiungere idAgency
        const newAgent = await Agent.create({
            idAgent: newUser.idUser,
            idManager: ManagerId,
            idAgency: agencyId
        });

        return { user: newUser, agent: newAgent };
    }
}