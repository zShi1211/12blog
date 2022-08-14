import axios from './axiosInstance';
import type { IPagingCondition } from './comment';


// 分页获取多篇分享
export function getAllShare({ offest = 1, limit = 5 }: IPagingCondition) {
    return axios.get(`/share?offest=${offest}&limit=${limit}`);
}


