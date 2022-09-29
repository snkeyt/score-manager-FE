import axios from "./interceptor";

export const listScores = (data: any) => {
    return axios.post('/scores', data)
}
export const addScore = (data: any) => {
    return axios.put('/scores/add', data)
}
export const updateScore = (data: any) => {
    return axios.post('/scores/update', data)
}
export const delScore = (data: any) => {
    console.log('data: ', data);
    return axios.delete('/scores/del/' + data)
}