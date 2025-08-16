import { DataTypes } from "sequelize";
import { createHash } from "crypto";

export function createModel(database) {
    database.define("Utente", {
        idUtente: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cognome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                const hash = createHash("sha256");
                this.setDataValue("password", hash.update(value).digest("hex"));
            }
        },
        indirizzoUtente: {
            type: DataTypes.STRING
        }
    } )
}