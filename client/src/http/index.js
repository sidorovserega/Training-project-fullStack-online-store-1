import axios from "axios";
//для запросав без авторизации
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

//для запросов с авторизацией
//автоматически будет подставляться в headers - aythorization и token
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})
//для автоматического подставления token в каждый запрос
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
}

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
}