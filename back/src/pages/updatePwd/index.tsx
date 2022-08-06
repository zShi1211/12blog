import { updatePwd } from '@/api/admin';
import { connect, History } from 'umi'
import { Button, Avatar, Form, Input } from 'antd';
import { IAdminInfo } from '../index/types';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { message, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/es/upload';
import { IUpdatePwd } from './types';
import { loginOut } from '../index';


interface IProps {
    loginOut: () => {},
    history: History
}


function UploadPwd({ loginOut, history }: IProps) {

    const onFinish = async (values: IUpdatePwd) => {
        const res: any = await updatePwd(values);
        if (!res.err) {
            message.success("修改成功,请重新登录");
            loginOut();
            history.push('/login')
        }
        else message.error(`修改失败,${JSON.stringify(res.err)}`)
    };

    const onFinishFailed = (e) => {
        message.error(`修改失败,${JSON.stringify(e)}`)
    };






    return (
        <div>
            <Upload />

            <Form
                name="basic"
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 5 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    label="当前密码:"
                    name="loginpwd"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="新密码："
                    name="newpwd"
                    rules={[{ required: true, message: 'Please input your newPassword!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="确认新密码："
                    name="confirmpwd"
                    dependencies={['newpwd']}
                    rules={[{ required: true, message: 'Please input your confirmPassword!' }, ({ getFieldValue }) => ({
                        validator(_, value) {
                            console.log(value)
                            if (!value || getFieldValue('newpwd') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),]}
                >
                    <Input.Password />
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


const mapDisptch2Props = (dispatch) => {
    return {
        loginOut() {
            loginOut(dispatch)
        }
    }
}


export default connect(null, mapDisptch2Props)(UploadPwd)