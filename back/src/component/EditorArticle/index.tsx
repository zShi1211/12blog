import { useEffect, useState } from "react";
import { Input, DatePicker, Switch, Button, Upload, UploadProps, UploadFile } from "antd";
import moment from 'moment';
import MdEditor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { uploadFile } from "@/api/upload";
import type { UploadChangeParam } from 'antd/es/upload';
import { UploadOutlined } from '@ant-design/icons';



interface IAritcleData {
    title: string;
    content: string;
    time: number;
    cover: string;
    ispublish: boolean;
    mdString: string;
    words: number;
}

interface IProps {
    defaultArtcileAData?: Partial<IAritcleData>
    onEimt: (articleData: IAritcleData) => {}
}
const dateFormat = 'YYYY/MM/DD';
export default function EditorArticle({ defaultArtcileAData = { time: new Date().valueOf() }, onEimt }: IProps) {
    const [articleData, setArticleData] = useState(defaultArtcileAData);
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'done') {
            setArticleData({
                ...articleData,
                cover: info.file.response.data
            });
        }
    };
    return (
        <div>
            <label className='inputItem' >
                <p className='titleItem'>标题:</p>
                <Input value={articleData.title} onChange={e => {
                    setArticleData({
                        ...articleData,
                        title: e.target.value
                    })
                }} />
            </label>
            <label className='inputItem' >
                <p className='titleItem' >封面:</p>
                <Upload
                    name="file"
                    showUploadList={false}
                    action="/api/upload"
                    onChange={handleChange}
                >
                    {articleData?.cover ? <img src={articleData?.cover} alt="avatar" style={{ width: '200px' }} /> : <Button icon={<UploadOutlined />}>Click to Upload</Button>}
                </Upload>
            </label>
            <label className='inputItem' >
                <p className='titleItem'>时间:</p>
                <DatePicker defaultValue={moment(articleData.time)} format={dateFormat} onChange={(date) => {
                    setArticleData({
                        ...articleData,
                        time: date!.valueOf()
                    })
                }} />
            </label>
            <label className='inputItem' >
                <p className='titleItem' >内容:</p>
                <MdEditor theme="dark" modelValue={articleData.mdString || ""} onChange={(value) => {
                    setArticleData({
                        ...articleData,
                        mdString: value
                    })
                }} onHtmlChanged={
                    (e) => {
                        setArticleData({
                            ...articleData,
                            content: e,
                            words: e.replace(/<[^<]+>/g, '').length
                        })
                    }
                } onUploadImg={async (files, callback) => {
                    const res = await Promise.all(
                        files.map(async (file) => {
                            const form = new FormData();
                            form.append('file', file);
                            return uploadFile(form);
                        }));
                    callback(res.map((item) => item.data));
                }} />
            </label>


            <label className='inputItem' >
                <p className='titleItem' >是否发布:</p>
                <Switch defaultChecked={articleData.ispublish} onChange={e => {
                    setArticleData({
                        ...articleData,
                        ispublish: e
                    })
                }}></Switch>
            </label>

            <label className='inputItem' >
                <p className='titleItem' ></p>
                <Button type="primary" onClick={() => {
                    onEimt(articleData as IAritcleData)
                }}>提交</Button>
            </label>
        </div>
    )
}