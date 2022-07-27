import ArticleEntity from "../entities/ArticleEntity";
import Article from "../model/Article";
import sequelize from "../model/db";
import { IPagingCondition, ISeartchCondition } from "./types";
import { Op } from 'sequelize'
import ShareEntity from "../entities/ShareEntity";
import Share from "../model/Share";
import parserValidate from "./utils/parserValidateErr";

export default class ShareService {
    static async add(share: object) {
        const s = ShareEntity.transform(share);
        const res = await s.validate();
        if (res) return  parserValidate(res);
        return (await Share.create(s)).toJSON();
    }

    static async delete(id: string) {
        const instance = await Share.findByPk(id);
        return await instance?.destroy()
    }

    static async update(id: string, share: object) {
        const s = ShareEntity.transform(share);
        const res = await s.validate(true);
        if (res) throw res;
        const instance = await Share.findByPk(id);
        return (await instance?.update(s))?.toJSON()
    }

    static async findOne(id: string) {
        return (await Share.findByPk(id))?.toJSON();
    }

    static async findAll({
        offest = 1,
        limit = 2,
    }: IPagingCondition) {
        const res = await Share.findAndCountAll({
            limit:+limit,
            offset: (offest - 1) * limit,
        })
        res.rows = res.rows.map(data => data.toJSON());
        return res;
    }
}
