import axios from './axiosInstance';

// 获取一篇文章
export function getOneArticle(id: string) {
    return axios.get(`/article/${id}`);
}

// 分页获取多篇文章
export interface ISeartchCondition {
    offest?: number;
    limit?: number;
}
export function getAllArticle({
    offest = 1,
    limit = 5,
}: ISeartchCondition) {
    return axios.get(`/article/public?offest=${offest}&limit=${limit}`);
}

export function likeArticle(id: string, like: number) {
    return axios.put(`/article/${id}/like`, {
        like
    });
}

