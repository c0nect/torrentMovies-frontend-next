import axios from "axios";
import { parseCookies } from "nookies";

const { 'jwt': token } = parseCookies()

export const apiUrl = axios.create({
    baseURL: "http://localhost:3000/api/v1",
})

apiUrl.interceptors.request.use((config) => {
    config.params = {
        api_key: process.env.API_KEY, ...config.params }; // tmdb
        return config;
})

if(token) {
    apiUrl.defaults.headers['Authorization'] = `Bearer ${token}`
}

export default apiUrl