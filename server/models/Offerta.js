import { DataTypes } from "sequelize";
import { createHash } from "crypto";

export function createModel(database) {
    database.define("Offerta", {
        idOfferta: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        somma: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        dataOfferta: {
            type: DataTypes.DATE,
            allowNull: false
        },
        inSistema: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        idUtente: {
            type: DataTypes.INTEGER
        },
        idAgente: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idImmobile: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idAgenzia: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    } )
}