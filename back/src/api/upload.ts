import axios from './axiosInstance';

// 登录

export function uploadFile(form) {
    return axios.post("/upload", form);
}
