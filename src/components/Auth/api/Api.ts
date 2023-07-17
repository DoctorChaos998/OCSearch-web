import {AxiosResponse} from 'axios'
import api from "@/http/axiosConfig";
import {IAuthResponse} from "@/entites/dtos/authResponse";

export default class AuthService {
    static async login(nickname: string, password: string, rememberMe: boolean): Promise<AxiosResponse<IAuthResponse>>{
        return await api.post<IAuthResponse>('/login', {nickname, password, rememberMe})
    }

    // static async registration(nickname: string, password: string): Promise<AxiosResponse<IAuthResponse>>{
    //     return api.post<IAuthResponse>('/registration', {nickname, password})
    // }
    static async logout(): Promise<void>{
        return await api.post('/logout')
    }

    static async checkAuth(): Promise<AxiosResponse<IAuthResponse>>{
        return await api.get<IAuthResponse>(`/refresh`)
    }
}