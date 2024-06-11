import axios from "axios";
import { getCookies } from "@coocse";

const request = axios.create({
    baseURL: "https://ecomapi.ilyosbekdev.uz"
})



request.interceptors.request.use((config) => {
    const access_token = getCookies("access_token") 
    if (access_token) {
        config.headers["Authorization"] =  `Bearer ${access_token}`
    }
    return config
})



export default request


