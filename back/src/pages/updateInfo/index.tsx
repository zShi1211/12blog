import admin from '@/models/admin';
import { connect, History } from 'umi'
import { Button, Avatar, Form, Input } from 'antd';
import { IAdminInfo } from '../index/types';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { message, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/es/upload';


interface IProps {
    adminInfo: IAdminInfo;
    fetchLogin: (newInfo: IAdminInfo) => boolean
}

const props: UploadProps = {
    name: 'file',
    action: '/api/upload',
};

function UploadInfo({ adminInfo, fetchLogin }: IProps) {
    const [imageUrl, setImageUrl] = useState<string>(adminInfo.avatar);

    useEffect(() => {
        setImageUrl(adminInfo.avatar)
    }, [adminInfo.avatar])


    const onFinish = async (values: any) => {
        const res = await fetchLogin({
            ...values,
            avatar: imageUrl
        })
        if (res) message.success("修改成功");
        else message.error("修改失败")
    };

    const onFinishFailed = () => {
        message.error("修改失败")
    };




    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'done') {
            setImageUrl(info.file.response.data);
        }
    };

    return (
        <div>
            <Upload />

            <Form
                name="basic"
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 5 }}
                initialValues={adminInfo}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    label="用户头像："
                    name="avatar"
                >
                    <Upload
                        name="file"
                        showUploadList={false}
                        action="/api/upload"
                        listType="picture-card"
                        onChange={handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> :
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        }
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="用户昵称:"
                    name="nickname"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="用户ID："
                    name="loginid"
                    rules={[{ required: true, message: 'Please input your userid!' }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 2, span: 5 }}>
                    <Button type="primary" htmlType="submit">
                        修改
                    </Button>
                </Form.Item>


            </Form>
        </div >

    )
}

const mapState2Props = store => ({
    adminInfo: store.admin.adminInfo
})
const mapDisptch2Props = (dispatch) => {
    return {
        fetchLogin(info: IAdminInfo): boolean {
            return dispatch({
                type: "admin/fetchUpdateInfo",
                payload: info
            })
        }
    }
}


export default connect(mapState2Props, mapDisptch2Props)(UploadInfo)