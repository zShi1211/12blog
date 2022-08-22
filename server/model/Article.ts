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
    cover: string;
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
    },
    like: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        set(value: number) {
            console.log(value < 0 ? 0 : value)
            this.setDataValue('like', value < 0 ? 0 : value);
        }
    },
    words: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    cover: {
        type: DataTypes.STRING,
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



