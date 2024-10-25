import { Sequelize } from "sequelize";
import "dotenv/config"

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
});

export default sequelize;