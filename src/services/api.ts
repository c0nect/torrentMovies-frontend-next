import axios from "axios";
import { parseCookies } from "nookies";

const { 'jwt': token } = parseCookies()

export const apiUrl = axios.create({
    baseURL: "http://localhost:3000/api/v1",
})

apiUrl.interceptors.response.use(config => {
    // console.log(config.data.movies[0].title)

    return config
})

if(token) {
    apiUrl.defaults.headers['Authorization'] = `Bearer ${token}`
}