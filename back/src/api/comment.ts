import axios from './axiosInstance';


// 获取一评论
export function getOneComment(id: string) {
    return axios.post(`/comment/${id}`);
}

// 分页获取多评论
export interface IPagingCondition {
    offest?: number;
    limit?: number;
}
export function getAllComment(id: string, { offest = 1, limit = 5 }: IPagingCondition) {
    return axios.get(`/comment/all/${id}?offest=${offest}&limit=${limit}`);
}

// 添加一评论
export function addComment(info: any) {
    return axios.post("/comment", info)
}

// 删除一评论
export function rmComment(id: string) {
    return axios.delete(`/comment/${id}`)
}

