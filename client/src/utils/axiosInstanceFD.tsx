import axios,{AxiosInstance, InternalAxiosRequestConfig, AxiosError} from "axios"
import { BASE_URL } from "./constants"


const axiosInstanceFD:AxiosInstance  = axios.create({
    baseURL:BASE_URL,
    timeout:10000,
    headers:{
        'Content-Type': 'multipart/form-data'
    }
})


axiosInstanceFD.interceptors.request.use(
    (config:InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const accessToken = localStorage.getItem("token")
        if(accessToken ){
            config.headers.Authorization= `Bearer ${accessToken}`
        }
        return config
    },
    (error:AxiosError): Promise<AxiosError>=>{
        return Promise.reject(error)
    }
)

export default axiosInstanceFD