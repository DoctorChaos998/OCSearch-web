import {AxiosResponse} from "axios";
import api from "@/http/axiosConfig";
import {IUserLoginInfoResponse} from "@/components/LoginsList/Api/Responce";



export default class LoginsService{
    static async getLogins(): Promise<AxiosResponse<IUserLoginInfoResponse[]>>{
        return await api.get<IUserLoginInfoResponse[]>('/logins')
    }
}