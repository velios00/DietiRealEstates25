import { Sequelize } from "sequelize";
import { createModel as createAdminModel } from "./Admin.js";
import { createModel as createAgenteModel } from "./Agente.js";
import { createModel as createAgenziaModel } from "./Agenzia.js";
import { createModel as createImmobileModel } from "./Immobile.js";
import { createModel as createManagerModel } from "./Manager.js";
import { createModel as createOffertaModel } from "./Offerta.js";
import { createModel as createRecensioneAgenteModel } from "./RecensioneAgente.js";
import { createModel as createUtenteModel } from "./Utente.js";

import dotenv from 'dotenv/config.js';

export const database = new Sequelize({
    storage: process.env.DB_CONNECTION_URI,
    dialect: process.env.DIALECT,
})

createAdminModel(database);
createAgenteModel(database);
createAgenziaModel(database);
createImmobileModel(database);
createManagerModel(database);
createOffertaModel(database);
createRecensioneAgenteModel(database);
createUtenteModel(database);

export const { Admin, Agente, Agenzia, Immobile, Manager, Offerta, RecensioneAgente, Utente } = database.models;

//Definizione delle associazioni tra i modelli
//Manager - Agenzia
Manager.Agenzia = Manager.hasOne(Agenzia, {
    foreignKey: {name: "idManager", allowNull: false}
});
Agenzia.Manager = Agenzia.belongsTo(Manager, {
    foreignKey: {name: "idManager", allowNull: false}
})

//Manager - Agente
Manager.Agente = Manager.hasMany(Agente, {
    foreignKey: {name: "idManager", allowNull: false}
})
Agente.Manager = Agente.belongsTo(Manager, {
    foreignKey: {name: "idManager", allowNull: false}
})

//Agenzia - Agente
Agenzia.Agente = Agenzia.hasMany(Agente, {
    foreignKey: {name: "idAgenzia", allowNull: false}
})
Agente.Agenzia = Agente.belongsTo(Agenzia, {
    foreignKey: {name: "idAgenzia", allowNull: false}
})

//Utente - RecensioneAgente
Utente.RecensioneAgente = Utente.hasMany(RecensioneAgente, {
    foreignKey: {name: "idUtente", allowNull: false}
})
RecensioneAgente.Utente = RecensioneAgente.belongsTo(Utente, {
    foreignKey: {name: "idUtente", allowNull: false}
})

//Agente - RecensioneAgente
Agente.RecensioneAgente = Agente.hasMany(RecensioneAgente, {
    foreignKey: {name: "idAgente", allowNull: false}
})
RecensioneAgente.Agente = RecensioneAgente.belongsTo(Agente, {
    foreignKey: {name: "idAgente", allowNull: false}
})

//Agenzia = Immobile
Agenzia.Immobile = Agenzia.hasMany(Immobile, {
    foreignKey: {name: "idAgenzia", allowNull: false}
})
Immobile.Agenzia = Immobile.belongsTo(Agenzia, {
    foreignKey: {name: "idAgenzia", allowNull: false}
})

//Utente - Offerta
Utente.Offerta = Utente.hasMany(Offerta, {
    foreignKey: {name: "idUtente", allowNull: false}
})
Offerta.Utente = Offerta.belongsTo(Utente, {
    foreignKey: {name: "idUtente", allowNull: false}
})

//Immobile - Offerta
Immobile.Offerta = Immobile.hasMany(Offerta, {
    foreignKey: {name: "idImmobile", allowNull: false}
})
Offerta.Immobile = Offerta.belongsTo(Immobile, {
    foreignKey: {name: "idImmobile", allowNull: false}
})

//Agente - Immobile
Agente.Immobile = Agente.hasMany(Immobile, {
    foreignKey: {name: "idAgente", allowNull: false}
})
Immobile.Agente = Immobile.belongsTo(Agente, {
    foreignKey: {name: "idAgente", allowNull: false}
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