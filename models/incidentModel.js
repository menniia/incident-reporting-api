import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Incident = sequelize.define(
    "Incident",
    {
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        incident_desc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        weather_report: {
            type: DataTypes.JSON
        }
    },
    {
        timestamps: true
    }
)

sequelize.sync({ force: true })

export default Incident;