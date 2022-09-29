import { Model, DataTypes, InferAttributes, InferCreationAttributes ,CreationOptional} from 'sequelize'
import sequelize from './db'
import { LetterType } from './types';

export default class Letter extends Model<InferAttributes<Letter>, InferCreationAttributes<Letter>> implements LetterType{
    id: CreationOptional<number>;
    nickname: string;
    content: string;
    time: number;
    avatar: string;
    isPrivate: boolean;
}
Letter.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('time');
            return new Date(rawValue).valueOf();
          },
    },
    avatar: {       
        type: DataTypes.STRING,
        allowNull: false
    },
    isPrivate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { tableName: 'letter', sequelize });


