import axios, {AxiosError} from "axios";
import {api} from "@/http";
import {
    type IErrorDeleteFolders,
    type IErrorDeleteFiles, IFolder, IFile
} from '@/types/fileSystem'
import {IApiError} from "@/types/api";


export default class FileSystemService{
    private static serviceUrl = '/file_system';
    static async getFolders(): Promise<Omit<IFolder, "isSelected">[]>{
        try {
            const response =  await api.get<Omit<IFolder, "isSelected">[]>(`${FileSystemService.serviceUrl}/folders`);
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
    static async createFolder(folderName: string): Promise<Omit<IFolder, "isSelected">>{
        try {
            const response = await api.post<Omit<IFolder, "isSelected">>(`${FileSystemService.serviceUrl}/folders`, {
                folderName
            });
            return Promise.resolve(response.data);
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
    static async renameFolder(folderId: number, newFolderName: string): Promise<void> {
        try {
            await api.patch(`${FileSystemService.serviceUrl}/folders/${folderId}`, {
                newFolderName
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
    static async getFiles(folderId: number): Promise<{folderName: string, files: Omit<IFile, "isSelected">[]}>{
        try{
            const response = await api.get<{folderName: string, files: Omit<IFile, "isSelected">[]}>(`${FileSystemService.serviceUrl}/files`, {params: {
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
    static async uploadFiles(formData: FormData, folderId: number, setProgress: (progress: number) => void): Promise<void> {
        try{
            await api.post(`${FileSystemService.serviceUrl}/files`, formData, {
                params:{
                    folderId
                },
                onUploadProgress(progressEvent) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
                    setProgress(percentCompleted);
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
    static async getFileRowsNumber(fileId: number): Promise<number>{
        try {
            const response = await api.get<{rowsNumber: number}>(`${FileSystemService.serviceUrl}/files/${fileId}/rows_number`);
            return Promise.resolve(response.data.rowsNumber);
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

    static async getFileRows (fileId: number, fromRowNumber: number, rowsNumber: number): Promise<string[]>{
        try {
            const response = await api.get<string[]>(`${FileSystemService.serviceUrl}/files/${fileId}/preview/raw`, {
                params:{
                    fromRowNumber,
                    rowsNumber
                }
            });
            return Promise.resolve(response.data);
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