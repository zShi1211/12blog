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

// 添加一篇文章
export function addArticle(info: any) {
    return axios.post("/article", info)
}


// 删除一篇文章
export function rmArticle(id: string) {
    return axios.delete(`/article/${id}`)
}

// 修改文章
export function updateArticle(id: string, info: any) {
    return axios.put(`/article/${id}`, info)
}

