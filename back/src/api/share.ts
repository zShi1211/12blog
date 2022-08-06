import axios from './axiosInstance';

// 获取一篇分享
export function getOneShare(id: string) {
    return axios.get(`/share/${id}`);
}

// 分页获取多篇分享
export interface IPagingCondition {
    offest?: number;
    limit?: number;
}
export function getAllShare(info: IPagingCondition) {
    return axios.get(`/letter?offest=${info.offest}&limit=${info.limit}`);
}

// 添加一篇分享
export function addShare(info: any) {
    return axios.post("/letter", info)
}


// 删除一篇分享
export function rmShare(id: string) {
    return axios.delete(`/letter/${id}`)
}

// 
