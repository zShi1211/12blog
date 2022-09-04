import SubCommentEntity from "../entities/SubCommentEntity";
import SubComment from "../model/SubComment";
import parserValidate from "./utils/parserValidateErr";

export default class CommentService {
    static async add(comment: object) {
        const c = SubCommentEntity.transform(comment);
        const res = await c.validate();
        if (res) throw parserValidate(res);
        return (await SubComment.create(c)).toJSON();
    }

    static async delete(id: string) {
        const instance = await SubComment.findByPk(id);
        return await instance?.destroy()
    }

}
