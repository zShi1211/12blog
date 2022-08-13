import { addArticle } from "@/api/article"
import EditorArticle from "@/component/EditorArticle"
import { message } from 'antd'

export default function ArticleAdd({ history }) {

    return (
        <EditorArticle onEimt={async (data) => {
            const res: any = await addArticle(data);

            if (!res.err) {
                message.success("添加成功");
            } else {
                message.error(`添加失败${JSON.stringify(res.err)}`)
            }
        }} />
    )
}