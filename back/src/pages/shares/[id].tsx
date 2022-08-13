import { getOneShare, updateShare } from "@/api/share";
import EditorShare from "@/component/EditorShare";
import { useEffect, useState } from "react";
import { ShareType } from ".";
import { Empty, message } from 'antd'

export default function ({ match }) {
    const [shareData, setShareData] = useState<ShareType>();
    useEffect(() => {
        (async () => {
            const res: any = await getOneShare(match.params.id);
            setShareData(res.data)
        })()
    }, [])
    return (
        shareData ?
            <EditorShare data={shareData} onEmit={async (data) => {
                const res: any = await updateShare(match.params.id, data);

                if (res.err) {
                    message.error("修改失败")
                } else {
                    message.success("修改成功")
                }

            }} />
            :
            <Empty />
    )
}