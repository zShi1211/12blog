import axios from './axiosInstance';

// 登录

export function login(info: any) {
    return axios.post("/admin/login", info);
}

// 注册
export function register(info: any) {
    return axios.post("/admin", info);
}

// 注销
export function rmAdmin() {
    return axios.delete("/admin")
}


// 修改个人信息

export function updateInfo(info: any) {
    return axios.put("/admin", info)
}

// 修改密码

export function updatePwd(info: any) {
    return axios.put("/admin/pwd", info)
}


// 我是谁
export function whoAmI() {
    return axios.get('/admin')
}