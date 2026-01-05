import { DataTypes } from "sequelize";
import { createHash } from "crypto";

export function createModel(database) {
    database.define("Admin", {
        idAdmin: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    } )
}