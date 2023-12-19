import api from "@/http";
import axios, {AxiosError} from "axios";
import {ISessionsInfo} from "@/http/userService/dataTransferObjects";


export default class UserService {
    private static serviceUrl = '/user';
    static async login(nickname: string, password: string, rememberMe: boolean): Promise<{nickname: string, accessToken: string}>{
        try {
            const response  =  await api.post<{nickname: string, accessToken: string}>(`${UserService.serviceUrl}/login`, {nickname, password, rememberMe});
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

    static async refreshTokens(): Promise<{nickname: string, accessToken: string}>{
        try {
            const response  =  await api.put(`${UserService.serviceUrl}/tokens`);
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