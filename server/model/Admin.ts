import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from './db'
import { AdminType } from './types';

export default class Admin extends Model<InferAttributes<Admin>, InferCreationAttributes<Admin>> implements AdminType {
    id: CreationOptional<number>;
    nickname: string;
    loginid: string;
    loginpwd: string;
    avatar: string;
}

Admin.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    loginid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    loginpwd: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { tableName: 'admin', sequelize });



