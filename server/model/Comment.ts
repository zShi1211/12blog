import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from './db'
import { CommentType } from './types';



export default class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> implements CommentType {
    id: CreationOptional<number>;

    articleId: number;
    nickname: string;
    content: string;
    time: number;
    avatar: string;
}

Comment.init({
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
    // foreignKey
    articleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    }
}, { tableName: 'comment', sequelize });



