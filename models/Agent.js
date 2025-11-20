import { DataTypes } from "sequelize";
import { createHash } from "crypto";

export function createModel(database) {
    database.define("Agent", {
        idAgent: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idAgency: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING
        },
        bio: {
            type: DataTypes.STRING,
            defaultValue: "Ancora nessuna biografia !"
        },
        idManager: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    } )
}