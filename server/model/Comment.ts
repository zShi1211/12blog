import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from './db'
import { CommentType } from './types';



export default class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> implements CommentType {
    id: CreationOptional<number>;

    articleId: number;
    nickname: string;
    content: string;
    time: string;
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
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // foreignKey
    articleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { tableName: 'comment', sequelize });



