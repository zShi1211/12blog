import axios from './axiosInstance';
import { IPagingCondition } from './comment';

// 获取一篇分享
export function getOneShare(id: string) {
    return axios.get(`/share/${id}`);
}

// 分页获取多篇分享
export function getAllShare({ offest = 1, limit = 5 }: IPagingCondition) {
    return axios.get(`/share?offest=${offest}&limit=${limit}`);
}

// 添加一篇分享s
export function addShare(info: any) {
    return axios.post("/share", info)
}


// 删除一篇分享
export function rmShare(id: string) {
    return axios.delete(`/share/${id}`)
}

//修改一篇分享

export function updateShare(id: string, data: any) {
    return axios.put(`/share/${id}`, data)
}

