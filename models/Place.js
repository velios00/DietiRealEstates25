import { DataTypes } from "sequelize";

export function createModel(database) {
    database.define("Place", {
        idPlace: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lat: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        lon: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        pois: {
            type: DataTypes.JSON
        }
    })
}