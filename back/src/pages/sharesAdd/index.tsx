import { addShare } from "@/api/share";
import EditorShare from "@/component/EditorShare";
import { message } from 'antd'

export default function () {
    return <EditorShare onEmit={async (data) => {
        const res: any = await addShare(data)
        if (res.err) {
            message.error("添加失败")
        } else {
            message.success("添加成功")
        }
    }} />
}