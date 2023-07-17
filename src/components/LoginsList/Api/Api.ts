import {AxiosResponse} from "axios";
import {IUserLoginInfoResponse} from "./Responce";
import api from "@/http/axiosConfig";


export default class LoginsService{
    static async getLogins(): Promise<AxiosResponse<IUserLoginInfoResponse[]>>{
        return await api.get<IUserLoginInfoResponse[]>('/logins')
    }
}