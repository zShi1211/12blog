import { IPagingCondition, } from "./types";
import CommentEntity from "../entities/CommentEntity";
import Comment from "../model/Comment";
import SubComment from "../model/SubComment";
import parserValidate from "./utils/parserValidateErr";

export default class CommentService {
    static async add(comment: object) {
        const c = CommentEntity.transform(comment);
        const res = await c.validate();
        if (res) throw parserValidate(res);

        return (await Comment.create(c)).toJSON();
    }

    static async delete(id: string) {
        const instance = await Comment.findByPk(id);
        return await instance?.destroy()
    }

    static async findOne(id: string) {
        return (await Comment.findByPk(id, {
            include: SubComment
        }))?.toJSON();
    }

    static async findAll(articleId: string, {
        offest = 1,
        limit = 10,
    }: IPagingCondition) {
        const count = await Comment.count({
            where: {
                articleId
            }
        });
        const res: any = await Comment.findAndCountAll({
            limit: +limit,
            offset: (offest - 1) * limit,
            where: {
                articleId
            },
            include: {
                model: SubComment,
                as:"SubComments"
            },
        })
        res.rows = res.rows.map((data: any) => data.toJSON());
        // 父评论+子评论
        res.countAll = res.count;
        // 父评论
        res.count = count;
        return res;
    }
}

