import axios from "axios";

export const useAxios = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 5000
})

useAxios.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error)
        return Promise.reject(error)
    }
)
useAxios.interceptors.request.use((config)=>{
    return config;
})
useAxios.interceptors.response.use((respond)=>{
    return respond;
})