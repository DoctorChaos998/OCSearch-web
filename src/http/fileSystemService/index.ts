import axios, {AxiosError} from "axios";
import {api} from "@/http";
import {
    type IGetFolderResponse,
    type IGetFileResponse,
    type IErrorCreateFolder,
    type IErrorDeleteFolders,
    type IErrorRenameFolder,
    type IErrorDeleteFiles
} from './dataTransferObjects'


export default class FileSystemService{
    private static serviceUrl = '/file_system';
    static async getFolders(): Promise<IGetFolderResponse[]>{
        try {
            const response =  await api.get<IGetFolderResponse[]>(`${FileSystemService.serviceUrl}/folders`);
            return Promise.resolve(response.data);
        } catch (error){
            if(axios.isAxiosError(error)){
                return Promise.reject();
            }
            throw error
        }

    }
    static async createFolder(folderName: string): Promise<IGetFolderResponse>{
        try {
            const response = await api.post<IGetFolderResponse>(`${FileSystemService.serviceUrl}/folders`, {
                folderName
            });
            return Promise.resolve(response.data);
        } catch (error){
            if(axios.isAxiosError<IErrorCreateFolder>(error)){
                const responseError: AxiosError<IErrorCreateFolder> = error;
                if(responseError.response?.status === 409){
                    return Promise.reject({
                        status: 409,
                        error: responseError.response?.data.error
                    });
                }
            }
            throw error
        }
    }
    static  async deleteFolders(folderIds: number[]): Promise<void>{
        try {
            await api.delete(`${FileSystemService.serviceUrl}/folders`, {
                params: {
                    folderIds
                }});
            return Promise.resolve();
        } catch (error){
            if(axios.isAxiosError<IErrorDeleteFolders>(error)){
                const responseError: AxiosError<IErrorDeleteFolders> = error;
                if(responseError.response?.status === 422){
                    return Promise.reject({
                        status: 422,
                        error: responseError.response.data.error,
                        deletedFolderIds: responseError.response.data.deletedFolderIds
                    })
                }
            }
            throw error
        }
    }
    static async renameFolder(folderId: number, newFolderName: string): Promise<void> {
        try {
            await api.patch(`${FileSystemService.serviceUrl}/folders/${folderId}`, {
                newFolderName
            });
            return Promise.resolve();
        } catch (error){
            if(axios.isAxiosError<IErrorRenameFolder>(error)){
                const responseError: AxiosError<IErrorRenameFolder> = error;
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
    static async getFiles(folderId: number): Promise<{folderName: string, files: IGetFileResponse[]}>{
        try{
            const response = await api.get<{folderName: string, files: IGetFileResponse[]}>(`${FileSystemService.serviceUrl}/files`, {params: {
                    folderId
                }});
            return Promise.resolve(response.data);
        } catch(error){
            if(axios.isAxiosError<{error: string}>(error)){
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
    static async uploadFiles(formData: FormData, folderId: number): Promise<void> {
        try{
            await api.post(`${FileSystemService.serviceUrl}/files`, formData, {
                params:{
                    folderId
                }
            });
            return Promise.resolve();
        } catch (error){
            if(axios.isAxiosError<{error: string}>(error)){
                const responseError: AxiosError<{error: string}> = error;
                if(responseError.response?.status === 422){
                    return Promise.reject({
                        status: 422,
                        error: responseError.response!.data.error
                    });
                }
            }
            throw error
        }
    }
    static  async deleteFiles(fileIds: number[]): Promise<void>{
        try {
            await api.delete(`${FileSystemService.serviceUrl}/files`, {params: {
                    fileIds
            }});
            return Promise.resolve();
        } catch(error){
            if(axios.isAxiosError<IErrorDeleteFiles>(error)){
                const responseError: AxiosError<IErrorDeleteFiles> = error;
                if(responseError.response?.status === 422){
                    return Promise.reject({
                        status: 422,
                        error: responseError.response.data.error,
                        deletedFileIds: responseError.response.data.deletedFileIds
                    });
                }
            }
            throw error
        }
    }
    static async renameFile(fileId: number, newFileName: string): Promise<void> {
        try {
            await api.patch(`${FileSystemService.serviceUrl}/files/${fileId}`, {
                newFileName
            });
            return Promise.resolve();
        } catch (error){
            if(axios.isAxiosError<{error: string}>(error)){
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