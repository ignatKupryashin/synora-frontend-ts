import axios, {AxiosRequestConfig} from "axios";

export const MAIN_API_URL = 'https://test.restoratika.notification.skroy.ru';
export const REGISTRY_API_URL = 'https://test.raida.notification.skroy.ru/api';

export const NOTIFICATION_API_URL = 'https://notification.skroy.ru/notification'



export const $mainApi = axios.create({
    // withCredentials: true,
    baseURL: MAIN_API_URL
})

export const $notificationApi = axios.create({
    baseURL: NOTIFICATION_API_URL
})

export const $registryApi = axios.create({
    // withCredentials: true,
    baseURL: REGISTRY_API_URL
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
