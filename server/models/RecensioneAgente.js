import { DataTypes } from "sequelize";
import { createHash } from "crypto";

export function createModel(database) {
    database.define("RecensioneAgente", {
        idRecensione: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        contenuto: {
            type: DataTypes.STRING,
        },
        voto: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idAgente: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idUtente: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    } )
}