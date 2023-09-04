import {AxiosResponse} from "axios";
import api from "@/http/axiosConfig";


export default class FileService{
    static async checkDirectoryName(fileName: string): Promise<AxiosResponse<ICheckFileNameResponse>>{
        return await api.post<ICheckFileNameResponse>('/check_directory_name', {fileName})
    }
}