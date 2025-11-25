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

        const manager = await Manager.findByPk(ManagerId);
        if (!manager) {
            throw new Error("Manager not found");
        }
        const agencyId = manager.idAgency;
        const newAgent = await Agent.create({
            idAgent: newUser.idUser,
            idManager: ManagerId,
            idAgency: agencyId
        });
        console.log("Password dell'agente creata", randomPassword)
        return { user: newUser, agent: newAgent };
    }
}