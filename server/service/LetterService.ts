import { IPagingCondition,  } from "./types";
import LetterEntity from "../entities/LetterEntity";
import Letter from "../model/Letter";
import parserValidate from "./utils/parserValidateErr";

export default class LetterService {
    static async add(letter: object) {
        const l = LetterEntity.transform(letter);
        const res = await l.validate();
        if (res) throw  parserValidate(res);

        return (await Letter.create(l)).toJSON();
    }

    static async delete(id: string) {
        const instance = await Letter.findByPk(id);
        return await instance?.destroy()
    }

    static async findOne(id: string) {
        return (await Letter.findByPk(id))?.toJSON();
    }

    static async findAll({
        offest = 1,
        limit = 10,
    }: IPagingCondition) {
        const res = await Letter.findAndCountAll({
            limit:+limit,
            offset: (offest - 1) * limit,
            order:[["time","desc"]]
        })
        res.rows = res.rows.map(data => data.toJSON());
        return res;
    }
}
