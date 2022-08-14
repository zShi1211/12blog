import axios from "axios";

const instance = axios.create({
    baseURL: '/api',
});

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('Authorization');
    if (token) {
        if (config.headers) {
            config.headers.Authorization = "Bearer " + token;
        }
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    const token = response.headers.authorization
    if (token) {
        localStorage.setItem("Authorization", token)
    }
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export default instance;