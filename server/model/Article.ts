import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from './db'
import { ArticleType } from './types';

export default class Article extends Model<InferAttributes<Article>, InferCreationAttributes<Article>> implements ArticleType {
    id: CreationOptional<number>;

    title: string;
    content: string;
    time: number;
    like: number;
    words: string;
    description: string;
    ispublish?: boolean;
    mdString: string;
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
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('time');
            return new Date(rawValue).valueOf();
        },
        set(value: number) {
            this.setDataValue('time', new Date(value).valueOf());
        }
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
    },
    mdString: {
        type: DataTypes.TEXT,
        defaultValue: false
    }
}, { tableName: 'article', sequelize });



