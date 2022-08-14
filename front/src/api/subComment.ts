import axios from './axiosInstance';



// 添加一子评论
export function addSubComment(info: any) {
    console.log(info)
    return axios.post("/subcomment", info)
}


