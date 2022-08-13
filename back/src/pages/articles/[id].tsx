import { getOneArticle, updateArticle } from '@/api/article'
import EditorArticle from '@/component/EditorArticle'
import { useEffect, useState } from 'react'
import { Empty, message } from 'antd';

export default function UpdateArticle({ match: { params }, history }) {
    const [articleData, setArticleData] = useState()
    useEffect(() => {
        (async () => {
            const data: any = await getOneArticle(params.id);
            setArticleData(data.data)
        })()
    }, [])
    return (
        <div>
            {
                articleData ?
                    <EditorArticle defaultArtcileAData={articleData} onEimt={async (data) => {
                        console.log(data)
                        const res: any = await updateArticle(params.id, data);
                        if (!res.err) {
                            message.success("修改成功");
                        } else {
                            message.error("修改失败")
                        }
                    }} />
                    :
                    <Empty />
            }

        </div>
    )
}