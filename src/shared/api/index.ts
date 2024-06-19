import axios, { AxiosRequestConfig } from 'axios'
import { MAIN_ROUTES } from '@/shared/lib'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    validateStatus: status => status < 499,
})

axiosInstance.interceptors.response.use(res => {
    if (res.status === 401) {
        localStorage.removeItem(import.meta.env.VITE_TOKEN)
        window.location.href = MAIN_ROUTES.main
    }
    return res
})

export const api = async (axiosConfig: AxiosRequestConfig) => {
    try {
        return await axiosInstance(axiosConfig)
    } catch (e) {
        console.log(e)
    }
}
