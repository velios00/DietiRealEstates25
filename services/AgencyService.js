import randomatic from "randomatic";



export class AgencyService {
    
    static async createAgency(Agency, User, Manager, dto){
        const randomString = randomatic("Aa0", 10);

        const newUser = await User.create({
            email: dto.manager.email,
            password: randomString,
            name: dto.manager.name,
            surname: dto.manager.surname,
            role: "manager"
        });

        const newAgency = await Agency.create({
            agencyName: dto.agencyName,
            address: dto.address,
            description: dto.description,
            profileImage: dto.profileImage,
            phoneNumber: dto.phoneNumber,
            url: dto.url
        });

        await Manager.create({
            idManager: newUser.idUser,
            idAgency: newAgency.idAgency
        });
        console.log("password del manager creata:", randomString); //poi bisogna inviarla per email, aggiustare
        console.log("idAgency del manager creata:", newAgency.idAgency);
        return {
            agency: newAgency,
            manager: newUser
        };
    }

    static async getAllAgencies(Agency, Manager, User){    //manager e' null, aggiustare
        const agencies = await Agency.findAll({
            include: [{
                model: Manager,
                include: [
                    {
                        model: User,
                    }
                ]
            }]
        });
        return agencies;
    }
}

