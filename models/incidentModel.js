import { DataTypes, Sequelize } from "sequelize";


const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres"
});

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
        tableName: "Incidents",
        timestamps: true
    }
)

export default Incident