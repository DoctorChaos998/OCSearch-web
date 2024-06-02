import api from "@/http";
import axios, {AxiosError, InternalAxiosRequestConfig} from "axios";
import type {ISessionsInfo} from "@/types/sessions";

export default class UserService {
    private static serviceUrl = '/user';
    private static accessToken: string;

    static createRequestInterceptor(){
        api.interceptors.request.clear();
        api.interceptors.request.use((config:InternalAxiosRequestConfig) => {
            config.headers.Authorization = `Bearer ${this.accessToken}`
            return config
        });
    }
    static createResponseInterceptor(logoutFunction: () => void){
        let isRetry = false;
        api.interceptors.response.use((config) => {
            return config
        }, async (error) => {
            const originalRequest = error.config;
            if (error.response.status === 401 && error.config && !isRetry) {
                try {
                    isRetry = true;
                    await UserService.refreshTokens();
                    isRetry = false;
                    this.createRequestInterceptor();
                    return api.request(originalRequest);
                } catch (error: any) {
                    this.clearAllInterceptor();
                    logoutFunction();
                }
            }
            throw error
        });
    }
    static clearAllInterceptor(){
        api.interceptors.request.clear();
        api.interceptors.response.clear();
    }

    static async login(nickname: string, password: string, rememberMe: boolean): Promise<{nickname: string}>{
        try {
            const response  =  await api.post<{nickname: string, accessToken: string}>(`${UserService.serviceUrl}/login`, {nickname, password, rememberMe});
            this.accessToken = response.data.accessToken;
            return Promise.resolve(response.data);
        } catch(error){
            if(axios.isAxiosError(error)){
                const responseError: AxiosError<{error: string}> = error;
                if(responseError.response){
                    return Promise.reject({
                        status: responseError.response.status,
                        error: responseError.response.data.error
                    });
                }
            }
            throw error
        }
    }

    static async logout(): Promise<void>{
        try {
            await api.post(`${UserService.serviceUrl}/logout`);
            this.clearAllInterceptor();
            return Promise.resolve();
        } catch(error){
            if(axios.isAxiosError(error)){
                const responseError: AxiosError<{error: string}> = error;
                if(responseError.response){
                    return Promise.reject({
                        status: responseError.response.status,
                        error: responseError.response.data.error
                    });
                }
            }
            throw error
        }
    }

    static async refreshTokens(): Promise<{nickname: string}>{
        try {
            const response  =  await api.put<{nickname: string, accessToken: string}>(`${UserService.serviceUrl}/tokens`);
            this.accessToken = response.data.accessToken;
            return Promise.resolve(response.data);
        } catch(error){
            if(axios.isAxiosError(error)){
                const responseError: AxiosError<{error: string}> = error;
                if(responseError.response){
                    return Promise.reject({
                        status: responseError.response.status,
                        error: responseError.response.data.error
                    });
                }
            }
            throw error
        }
    }
    static async getSessions(): Promise<ISessionsInfo>{
        try {
            const response = await api.get<ISessionsInfo>(`${UserService.serviceUrl}/sessions`);
            return Promise.resolve(response.data);
        } catch (error){
            if(axios.isAxiosError(error)){
                const responseError: AxiosError<{error: string}> = error;
                if(responseError.response){
                    return Promise.reject({
                        status: responseError.response.status,
                        error: responseError.response.data.error
                    });
                }
            }
            throw error
        }
    }

    static async closeSession(sessionId: number): Promise<void>{
        try {
            await api.delete(`${UserService.serviceUrl}/sessions/${sessionId}`);
            return Promise.resolve();
        } catch (error){
            if(axios.isAxiosError(error)){
                const responseError: AxiosError<{error: string}> = error;
                if(responseError.response){
                    return Promise.reject({
                        status: responseError.response.status,
                        error: responseError.response.data.error
                    });
                }
            }
            throw error
        }
    }
    static async closeAllSession(): Promise<void>{
        try {
            await api.delete(`${UserService.serviceUrl}/sessions`);
            return Promise.resolve();
        } catch (error){
            if(axios.isAxiosError(error)){
                const responseError: AxiosError<{error: string}> = error;
                if(responseError.response){
                    return Promise.reject({
                        status: responseError.response.status,
                        error: responseError.response.data.error
                    });
                }
            }
            throw error
        }
    }

    static async changePassword(currentPassword: string, newPassword: string): Promise<void>{
        try {
            await api.put(`${UserService.serviceUrl}/password`, {currentPassword, newPassword});
            return Promise.resolve();
        } catch (error){
            if(axios.isAxiosError(error)){
                const responseError: AxiosError<{error: string}> = error;
                if(responseError.response){
                    return Promise.reject({
                        status: responseError.response.status,
                        error: responseError.response.data.error
                    });
                }
            }
            throw error
        }
    }
}