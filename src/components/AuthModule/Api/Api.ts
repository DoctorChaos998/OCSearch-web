import {AxiosResponse} from 'axios'
import api from "@/http/axiosConfig";
import {IAuthResponse} from "@/components/AuthModule/Api/AuthResponse";



export default class AuthService {
    static async userLogin(nickname: string, password: string, rememberMe: boolean): Promise<AxiosResponse<IAuthResponse>>{
        return await api.post<IAuthResponse>('/login', {nickname, password, rememberMe})
    }

    static async userLogout(): Promise<AxiosResponse>{
        return await api.post('/logout')
    }

    static async userRefreshTokens(): Promise<AxiosResponse<IAuthResponse>>{
        return await api.get<IAuthResponse>(`/refresh`)
    }
}