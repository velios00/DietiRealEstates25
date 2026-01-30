import { DataTypes } from "sequelize";
import { createHash } from "crypto";

export function createModel(database) {
  database.define(
    "RealEstate",
    {
      idRealEstate: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },

      photos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      type: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      creationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      nRooms: {
        type: DataTypes.INTEGER,
      },
      nBathrooms: {
        type: DataTypes.INTEGER,
      },
      energyClass: {
        type: DataTypes.STRING,
      },
      floor: {
        type: DataTypes.INTEGER,
      },
      idAgent: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      idManager: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      idAgency: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.ENUM("agent", "manager"),
        allowNull: false,
      },
      idPlace: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      validate: {
        consistentCreator() {
          if (this.createdBy === "agent" && !this.idAgent) {
            throw new Error('When createdBy is "agent", idAgent must be set');
          }
          if (this.createdBy === "manager" && !this.idManager) {
            throw new Error(
              'When createdBy is "manager", idManager must be set',
            );
          }
          if (this.createdBy === "agent" && this.idManager) {
            throw new Error(
              'When createdBy is "agent", idManager must be null',
            );
          }
          if (this.createdBy === "manager" && this.idAgent) {
            throw new Error(
              'When createdBy is "manager", idAgent must be null',
            );
          }
        },
      },
    },
  );
}
