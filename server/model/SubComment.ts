import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from './db'
import { SubCommentType } from './types';

export default class SubComment extends Model<InferAttributes<SubComment>, InferCreationAttributes<SubComment>> implements SubCommentType {
    id: CreationOptional<number>;

    nickname: string;
    content: string;
    time: number;
    avatar: string;
    replyId: number;
    isReplySubComment: boolean;
    replySubId?: number | null;
}

SubComment.init({
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
        set(value: number) {
            console.log(typeof value)
            this.setDataValue('time', new Date(value).valueOf());
        }
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // foreignKey
    replyId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    isReplySubComment: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    replySubId: {
        type: DataTypes.INTEGER,
    }
}, { tableName: 'subcomment', sequelize });



