import { Sequelize } from "sequelize";
import { createModel as createAdminModel } from "./Admin.js";
import { createModel as createAgentModel } from "./Agent.js";
import { createModel as createAgencyModel } from "./Agency.js";
import { createModel as createRealEstateModel } from "./RealEstate.js";
import { createModel as createManagerModel } from "./Manager.js";
import { createModel as createOfferModel } from "./Offer.js";
import { createModel as createUserModel } from "./User.js";

import dotenv from 'dotenv';
dotenv.config();

export const database = new Sequelize(process.env.DB_CONNECTION_URI, {
    dialect: process.env.DIALECT,
    //logging: false
})

createAdminModel(database);
createAgentModel(database);
createAgencyModel(database);
createRealEstateModel(database);
createManagerModel(database);
createOfferModel(database);
createUserModel(database);

export const { Admin, Agent, Agency, RealEstate, Manager, Offer, User } = database.models;

//Definizione delle associazioni tra i modelli

//User - Agent
User.Agent = User.hasOne(Agent, {
    foreignKey: { name: "idAgent", allowNull: false }
})

Agent.User = Agent.belongsTo(User, {
    foreignKey: { name: "idAgent", allowNull: false }
});

// User - Manager
User.Manager = User.hasOne(Manager, {
    foreignKey: { name: "idManager", allowNull: false }
});
Manager.User = Manager.belongsTo(User, {
    foreignKey: { name: "idManager", allowNull: false }
});

// User - Admin - da rivedere
User.Admin = User.hasOne(Admin, {
    foreignKey: { name: "idAdmin", allowNull: false }
});
Admin.User = Admin.belongsTo(User, {
    foreignKey: { name: "idAdmin", allowNull: false }
});

//Manager - Agency
Manager.Agency = Manager.hasOne(Agency, {
    foreignKey: {name: "idManager", allowNull: false}
});
Agency.Manager = Agency.belongsTo(Manager, {
    foreignKey: {name: "idManager", allowNull: false}
})

//Manager - Agent
Manager.Agent = Manager.hasMany(Agent, {
    foreignKey: {name: "idManager", allowNull: false}
})
Agent.Manager = Agent.belongsTo(Manager, {
    foreignKey: {name: "idManager", allowNull: false}
})

//Agency - Agent
Agency.Agent = Agency.hasMany(Agent, {
    foreignKey: {name: "idAgency", allowNull: false}
})
Agent.Agency = Agent.belongsTo(Agency, {
    foreignKey: {name: "idAgency", allowNull: false}
})

//Agency = RealEstate
Agency.RealEstate = Agency.hasMany(RealEstate, {
    foreignKey: {name: "idAgency", allowNull: false}
})
RealEstate.Agency = RealEstate.belongsTo(Agency, {
    foreignKey: {name: "idAgency", allowNull: false}
})

//User - Offer
User.Offer = User.hasMany(Offer, {
    foreignKey: {name: "idUser", allowNull: false}
})
Offer.User = Offer.belongsTo(User, {
    foreignKey: {name: "idUser", allowNull: false}
})

//RealEstate - Offer
RealEstate.Offer = RealEstate.hasMany(Offer, {
    foreignKey: {name: "idRealEstate", allowNull: false}
})
Offer.RealEstate = Offer.belongsTo(RealEstate, {
    foreignKey: {name: "idRealEstate", allowNull: false}
})

// Agent - RealEstate (
Agent.RealEstate = Agent.hasMany(RealEstate, {
    foreignKey: {name: "idAgent", allowNull: true}
})
RealEstate.Agent = RealEstate.belongsTo(Agent, {
    foreignKey: {name: "idAgent", allowNull: true}
})

// Manager - RealEstate 
Manager.RealEstate = Manager.hasMany(RealEstate, {
    foreignKey: {name: "idManager", allowNull: true}
})
RealEstate.Manager = RealEstate.belongsTo(Manager, {
    foreignKey: {name: "idManager", allowNull: true}
})

//Sincronizzazione database
database
  .sync()
  .then(() => {
    console.log("Database sincronizzato");
  })
  .catch((err) => {
    console.log("Errore nella sincronizzazione: " + err.message);
  });