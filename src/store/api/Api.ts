import {AxiosResponse} from 'axios'
import api from "@/http/axiosConfig";
import {IAuthResponse} from "@/entites/dtos/authResponse";

interface temp {
    a:string
}
export default class AuthService {
    static async login(nickname: string, password: string, rememberMe: boolean): Promise<AxiosResponse<IAuthResponse>>{
        return await api.post<IAuthResponse>('/login', {nickname, password, rememberMe})
    }

    // static async registration(nickname: string, password: string): Promise<AxiosResponse<IAuthResponse>>{
    //     return api.post<IAuthResponse>('/registration', {nickname, password})
    // }
    static async logout(): Promise<AxiosResponse<temp>>{
        return await api.post<temp>('/logout')
    }

    static async checkAuth(): Promise<AxiosResponse<IAuthResponse>>{
        return await api.get<IAuthResponse>(`/refresh`)
    }
}