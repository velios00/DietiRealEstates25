import { DataTypes } from "sequelize";
import { createHash } from "crypto";

export function createModel(database) {
    database.define("Offer", {
        idOffer: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        dateOffer: {
            type: DataTypes.DATE,
            allowNull: false
        },
        inSistem: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        idUser: {
            type: DataTypes.INTEGER
        },
        idAgent: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idRealEstate: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idAgency: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    } )
}