import { Model, DataTypes, InferAttributes, InferCreationAttributes ,CreationOptional} from 'sequelize'
import sequelize from './db'
import { ShareType } from './types';

export default class Share extends Model<InferAttributes<Share>, InferCreationAttributes<Share>> implements ShareType {
    id: CreationOptional<number>;

    pictureUrl: string;
    description: string;
    time: string;
}

Share.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    pictureUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, { tableName: 'share', sequelize });



