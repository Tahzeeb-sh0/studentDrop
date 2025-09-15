import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize, CreationOptional } from 'sequelize';

export type UserRole = 'admin' | 'mentor' | 'student';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
	declare id: CreationOptional<number>;
	declare name: string;
	declare email: string;
	declare passwordHash: string;
	declare role: UserRole;
}

export type UserInstance = typeof User;

export function defineUserModel(sequelize: Sequelize): UserInstance {
	User.init(
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			name: { type: DataTypes.STRING, allowNull: false },
			email: { type: DataTypes.STRING, allowNull: false, unique: true },
			passwordHash: { type: DataTypes.STRING, allowNull: false },
			role: { type: DataTypes.ENUM('admin', 'mentor', 'student'), allowNull: false, defaultValue: 'student' },
		},
		{
			sequelize,
			tableName: 'users',
		}
	);
	return User;
}
