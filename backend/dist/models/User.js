import { DataTypes, Model } from 'sequelize';
export class User extends Model {
}
export function defineUserModel(sequelize) {
    User.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        passwordHash: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.ENUM('admin', 'mentor', 'student'), allowNull: false, defaultValue: 'student' },
    }, {
        sequelize,
        tableName: 'users',
    });
    return User;
}
