import { Model, DataTypes,  CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from './db'
import { ArticleType } from './types';

export default class Article extends Model<InferAttributes<Article>, InferCreationAttributes<Article>> implements ArticleType {
    id: CreationOptional<number>;

    title: string;
    content: string;
    time: string;
    like: number;
    words: string;
    description: string;
    ispublish?: boolean;
}

Article.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    like: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    words: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    ispublish: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { tableName: 'article', sequelize });



