import { DataTypes } from "sequelize";
import { createHash } from "crypto";

export function createModel(database) {
    database.define("Manager", {
        idManager: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idAgency: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    } )
}