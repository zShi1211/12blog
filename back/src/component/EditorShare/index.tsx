import { ShareType } from "@/pages/shares"
import { useState } from "react"
import { Upload, Button, Input, DatePicker } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment'

interface IProps {
    data?: Partial<ShareType>,
    onEmit: (data: ShareType) => void
}
const dateFormat = 'YYYY/MM/DD';
const { TextArea } = Input;
export default function EditorShare({ onEmit, data = { time: new Date().valueOf() } }: IProps) {
    const [shareData, setShareDate] = useState(data)
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'done') {
            setShareDate({
                ...shareData,
                pictureUrl: info.file.response.data
            });
        }
    };

    return (
        <>
            <label className='inputItem' >
                <p className='titleItem'>图片:</p>
                <Upload
                    name="file"
                    showUploadList={false}
                    action="/api/upload"
                    onChange={handleChange}
                >
                    {shareData?.pictureUrl ? <img src={shareData?.pictureUrl} alt="avatar" style={{ width: '200px' }} /> : <Button icon={<UploadOutlined />}>Click to Upload</Button>}
                </Upload>


            </label>

            <label className='inputItem' >
                <p className='titleItem'>时间:</p>

                <DatePicker defaultValue={moment(shareData?.time)} format={dateFormat} />
            </label>


            <label className='inputItem' >
                <p className='titleItem'>描述:</p>
                <TextArea rows={4} style={{ width: 500 }} value={shareData?.description} onChange={e => {
                    setShareDate({
                        ...shareData,
                        description: e.target.value
                    })
                }} />
            </label>

            <label className='inputItem' >
                <p className='titleItem'></p>
                <Button type="primary" onClick={() => { onEmit(shareData as ShareType) }}>提交</Button>
            </label>

        </>
    )
}