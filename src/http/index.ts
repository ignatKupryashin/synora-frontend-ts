import axios, {AxiosRequestConfig} from "axios";

//Тестовые
export const MAIN_API_URL = 'https://test.restoratika.notification.skroy.ru';
export const NOTIFICATION_API_URL = 'https://restoratika.notification.skroy.ru';

//Боевые
// export const MAIN_API_URL = 'https://auth.synora.ru';
// export const REGISTRY_API_URL = 'https://reg.synora.ru/api';
// export const NOTIFICATION_API_URL = 'https://api.synora.ru'



export const $mainApi = axios.create({
    // withCredentials: true,
    baseURL: MAIN_API_URL
})

export const $notificationApi = axios.create({
    baseURL: NOTIFICATION_API_URL
})

$mainApi.interceptors.request.use((config:AxiosRequestConfig) => {
    config.headers = {
        ...config.headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    return config;
})

$notificationApi.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers = {
        ...config.headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    return config;
})
