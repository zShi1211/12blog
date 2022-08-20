import axios from './axiosInstance';
import type { IPagingCondition } from './comment';


// 分页获取多封信
export function getAllLetter({ offest = 1, limit = 5 }: IPagingCondition) {
    return axios.get(`/letter/public?offest=${offest}&limit=${limit}`);
}

// 添加一封信
export function addLetter(info: any) {
    return axios.post("/letter", info)
}

