import ArticleEntity from "../entities/ArticleEntity";
import Article from "../model/Article";
import sequelize from "../model/db";
import { ISeartchCondition } from "./types";
import { Op } from 'sequelize'
import parserValidate from "./utils/parserValidateErr";

export default class ArticleService {
    static async add(aritle: object) {
        const a = ArticleEntity.transform(aritle);
        const res = await a.validate();
        if (res) throw parserValidate(res);

        return (await Article.create(a)).toJSON();
    }

    static async delete(id: string) {
        const instance = await Article.findByPk(id);
        return await instance?.destroy()
    }

    static async update(id: string, article: object) {
        const a = ArticleEntity.transform(article);
        const res = await a.validate(true);
        if (res) throw parserValidate(res);

        const instance = await Article.findByPk(id);
        return (await instance?.update(a))?.toJSON()
    }

    static async findOne(id: string) {
        return (await Article.findByPk(id))?.toJSON();
    }

    static async findAll({
        key = '',
        page = 1,
        limit = 2,
        sort = "DESC"
    }: ISeartchCondition) {
        const res = await Article.findAndCountAll({
            where: {
                title: {
                    [Op.like]: `%${key}%`,
                }
            },
            order: [["time", sort]],
            limit: +limit,
            offset: (page - 1) * limit,
        })

        res.rows = res.rows.map(data => data.toJSON());
        return res;
    }
}
