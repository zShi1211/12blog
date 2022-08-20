import styles from './index.css'
import React, { useState } from 'react'
import { connect,  history } from 'umi';
import { IFetchLogin, ILoginInfo, IRegisterInfo } from './types';
import { message } from 'antd';
import { register } from '@/api/admin';
import avatar from '@/assets/img/avatar.jpg'



const Login: React.FC<{ fetchLogin: IFetchLogin, }> = ({ fetchLogin, }) => {
    // 登录/注册类名切换
    const [active, setActive] = useState<string>("");

    // 登录信息
    const [loginInfo, setLoginInfo] = useState<ILoginInfo>({ loginid: "", loginpwd: "" })

    // 注册信息
    const [registerInfo, setRigister] = useState<IRegisterInfo>({ loginid: "", loginpwd: "", confirmpwd: "" })

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.login} ${active}`}>

                {/*  登录 */}
                <div className={`${styles.signIn} ${styles.form}`} >
                    <h1>登录</h1>
                    <div>
                        <p>
                            <input type="text" placeholder="UserId" value={loginInfo.loginid} onChange={e => {
                                setLoginInfo({
                                    ...loginInfo,
                                    loginid: e.target.value
                                })
                            }} />
                        </p>
                        <p>
                            <input type="password" placeholder='Password' value={loginInfo.loginpwd} onChange={e => {
                                setLoginInfo({
                                    ...loginInfo,
                                    loginpwd: e.target.value
                                })
                            }} />
                        </p>
                        <p>
                            <button onClick={async () => {
                                message.loading("登录中~", 0);
                                const res = await fetchLogin(loginInfo);
                                message.destroy();
                                if (res) {
                                    message.success("登录成功！")
                                    history.push('/')
                                } else {
                                    message.error("登录失败！")
                                }
                            }}>登录</button>
                        </p>
                    </div>
                </div>

                {/* 注册 */}
                <div className={`${styles.signUp} ${styles.form}`}>
                    <h1>注册</h1>
                    <div>
                        <p>
                            <input type="text" placeholder='UserId' value={registerInfo.loginid} onChange={e => {
                                setRigister({
                                    ...registerInfo,
                                    loginid: e.target.value
                                })
                            }} />
                        </p>
                        <p>
                            <input type="password" name="" id="" placeholder='Password' value={registerInfo.loginpwd} onChange={e => {
                                setRigister({
                                    ...registerInfo,
                                    loginpwd: e.target.value
                                })
                            }} />
                        </p>
                        <p>
                            <input type="password" name="" id="" placeholder='ConfirmPawword' value={registerInfo.confirmpwd} onChange={e => {
                                setRigister({
                                    ...registerInfo,
                                    confirmpwd: e.target.value
                                })
                            }} />
                        </p>
                        <p>
                            <button onClick={async () => {
                                const defaultNickName = 'defaultNickName';
                                const defaultAvatar = avatar
                                message.loading("注册中~", 0);
                                const res = await register({
                                    ...registerInfo,
                                    nickname: defaultNickName,
                                    avatar: defaultAvatar
                                })
                                message.destroy();
                                if (res) {
                                    message.success("注册成功！")
                                    // 注册成功后跳转登录选项
                                    setActive("");
                                    setLoginInfo({
                                        loginid: registerInfo.loginid,
                                        loginpwd: registerInfo.loginpwd
                                    })
                                } else {
                                    message.error("注册失败！")
                                }
                            }}>注册</button>
                        </p>
                    </div>
                </div>

                {/* 切换 */}
                <div className={styles.switch}>
                    <div className={styles.container}>
                        <div className={styles.toLogin}>
                            <h1>欢迎来带后台！</h1>
                            <p className={styles.tip}>为了与我们保持联系，请使用您的个人信息注册一个账户吧</p>
                            <p><button onClick={() => {
                                setActive("")
                            }}>我要登录</button></p>
                        </div>
                        <div className={styles.toRegister}>
                            <h1>你好，朋友！</h1>
                            <p className={styles.tip}>请输入的你的个人信息，开启你的管理员之旅吧</p>
                            <p> <button onClick={() => {
                                setActive(styles.activeSignUp)
                            }}>我要注册</button></p>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

const mapDisptch2Props = (dispatch) => {
    return {
        fetchLogin(info: IFetchLogin): boolean {
            return dispatch({
                type: "admin/fetchLogin",
                payload: info
            })
        }
    }
}
export default connect(null, mapDisptch2Props)(Login)