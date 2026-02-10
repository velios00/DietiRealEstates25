import { DataTypes } from "sequelize";

export function createModel(database) {
  database.define("Admin", {
    idAdmin: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  });
}
