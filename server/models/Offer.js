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
        status: {
            type: DataTypes.ENUM("pending", "accepted", "rejected", "countered"),
            allowNull: false,
            defaultValue: "pending"
        },
        idUser: {
            type: DataTypes.INTEGER
        }, 
        idRealEstate: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    } )
}