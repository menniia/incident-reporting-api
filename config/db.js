import { Sequelize } from "sequelize";
import "dotenv/config"

// const sequelize = new Sequelize({
//     dialect: "postgres",
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// })


const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
});

export default sequelize;