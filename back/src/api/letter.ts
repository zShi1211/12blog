import axios from './axiosInstance';

// 获取一封信
export function getOneLetter(id: string) {
    return axios.get(`/letter/${id}`);
}

// 分页获取多封信
export interface IPagingCondition {
    offest?: number;
    limit?: number;
}
export function getAllLetter(info: IPagingCondition) {
    return axios.get(`/letter?offest=${info.offest}&limit=${info.limit}`);
}

// 添加一封信
export function addLetter(info: any) {
    return axios.post("/letter", info)
}


// 删除一封信
export function rmLetter(id: string) {
    return axios.delete(`/letter/${id}`)
}


// 修改一封信
export function updateLetter(id: string, info: any) {
    return axios.put(`/letter/${id}`, info)
}
