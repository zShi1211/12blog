import axios from './axiosInstance';

// 获取一篇文章
export function getOneArticle(id: string) {
    return axios.get(`/article/${id}`);
}

// 分页获取多篇文章
export interface ISeartchCondition {
    page?: number;
    limit?: number;
    sort?: "DESC" | "ASC";
    key?: string;
}
export function getAllArticle({
    page = 1,
    limit = 5,
    key = "",
    sort = "DESC"
}: ISeartchCondition) {
    return axios.get(`/article?page=${page}&limit=${limit}&key=${key}&sort=${sort}`);
}

export function likeArticle(id: string, like: number) {
    return axios.put(`/article/${id}/like`, {
        like
    });
}

