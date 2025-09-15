import { Sequelize } from 'sequelize';
import { config } from '../config/index.js';
import { defineUserModel, UserInstance } from './User.js';

export const sequelize = new Sequelize(config.databaseUrl, {
	logging: false,
});

export const Models = {
	User: defineUserModel(sequelize),
};

export type DatabaseModels = typeof Models & {
	User: UserInstance;
};

export async function initializeDatabase(): Promise<void> {
	await sequelize.authenticate();
	await sequelize.sync();
}
