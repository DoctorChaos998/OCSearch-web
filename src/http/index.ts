import axios from 'axios'

const API_URL = 'http://www.ocsearch:12345/api'

export const api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

export default api