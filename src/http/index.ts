import axios from 'axios'

const API_URL = process.env.NODE_ENV === 'production'?'https://ocsearch.ru:12345':'http://localhost:5000/api';

export const api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

export default api