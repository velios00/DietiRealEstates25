import { DataTypes } from "sequelize";
import { createHash } from "crypto";

export function createModel(database) {
    database.define("Agenzia", {
        idAgenzia: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nomeAgenzia: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        idManager: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    } )
}