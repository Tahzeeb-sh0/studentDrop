import { Sequelize } from 'sequelize';
import { config } from '../config/index.js';
import { defineUserModel } from './User.js';
export const sequelize = new Sequelize(config.databaseUrl, {
    logging: false,
});
export const Models = {
    User: defineUserModel(sequelize),
};
export async function initializeDatabase() {
    await sequelize.authenticate();
    await sequelize.sync();
}
