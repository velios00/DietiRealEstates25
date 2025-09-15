import { DataTypes } from "sequelize";
import { createHash } from "crypto";

export function createModel(database) {
    database.define("Agency", {
        idAgency: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        agencyName: {
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