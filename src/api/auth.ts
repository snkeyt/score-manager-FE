import axios from "./interceptor";

export const login = (data: any) => {
    return axios.post('/auth/login', data)
}
export const register = (data: any) => {
    return axios.post('/auth/register', data)
}