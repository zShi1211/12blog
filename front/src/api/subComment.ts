import axios from './axiosInstance';



// 添加一子评论
export function addSubComment(info: any) {
    return axios.post("/subcomment", info)
}


