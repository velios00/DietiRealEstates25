import { DataTypes } from "sequelize";
import { createHash } from "crypto";

export function createModel(database) {
    database.define("RealEstate", {
        idRealEstate: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
            type: DataTypes.STRING,
        },
        photo: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2), //occhio qui
            allowNull: false
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idAgent: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idAgency: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    } )
}