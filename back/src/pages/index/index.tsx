import admin from '@/models/admin';
import { Input, Avatar, Button } from 'antd';
import { connect, History } from 'umi'
import "./index.css"
import { IProps } from './types';



function Index({ adminInfo, loginOut, history }: IProps) {
    return (
        <div>
            <label className='inputItem' >
                <p className='titleItem'>用户头像:</p>
                <Avatar shape="square" size={64} src={adminInfo.avatar} />
            </label>
            <label className='inputItem' >
                <p className='titleItem'>用户ID:</p>
                <Input value={adminInfo.loginid} />
            </label>

            <label className='inputItem' >
                <p className='titleItem'>用户昵称:</p>
                <Input value={adminInfo.nickname} />
            </label>

            <label className='inputItem' >
                <p className='titleItem'></p>
                <Button type="primary" danger onClick={() => {
                    loginOut();
                    history.push('/login')
                }}
                >
                    退出
                </Button>
            </label>
        </div>
    )
}

const mapState2Props = store => ({
    adminInfo: store.admin.adminInfo
})

export function loginOut(dispatch) {
    dispatch({ type: "admin/setLoginState", payload: false });
    dispatch({ type: "admin/setAdminInfo", payload: {} });
    localStorage.removeItem('Authorization')
}

const mapDisptch2Props = dispatch => ({
    loginOut() {
        loginOut(dispatch)
    }
})


export default connect(mapState2Props, mapDisptch2Props)(Index)