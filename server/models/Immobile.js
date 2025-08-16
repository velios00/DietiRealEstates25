import { DataTypes } from "sequelize";
import { createHash } from "crypto";

export function createModel(database) {
    database.define("Immobile", {
        idImmobile: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        descrizione: {
            type: DataTypes.STRING,
        },
        foto: {
            type: DataTypes.STRING,
        },
        prezzo: {
            type: DataTypes.DECIMAL(10, 2), //occhio qui
            allowNull: false
        },
        dimensioni: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idAgenzia: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    } )
}