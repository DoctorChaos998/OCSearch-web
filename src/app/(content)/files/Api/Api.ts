import {AxiosResponse} from "axios";
import api from "@/http/axiosConfig";


export default class FileService{
    static async getFolders(): Promise<AxiosResponse<IGetFolders[]>>{
        return await api.get<IGetFolders[]>('/get_folders_info')
    }

    static async getFiles(folderId: number): Promise<AxiosResponse<IGetFiles[]>>{
        return await api.get<IGetFiles[]>('/get_files_info', {params: {
            folderId: folderId
            }})
    }
    static  async deleteFolders(folderIds: number[]): Promise<AxiosResponse<IDeleteFolders|null>>{
        return await api.delete('/delete_folders', {params: {
            folderIds
            }})
    }
    static  async deleteFiles(fileIds: number[]): Promise<AxiosResponse<IDeleteFiles|null>>{
        return await api.delete('/delete_files', {params: {
                fileIds
            }})
    }
    static async checkFolderName(folderName: string): Promise<AxiosResponse>{
        return await api.get('/check_folder_name',
            {
                params:
                    {
                        folderName
                    },
            })
    }
    static async uploadFiles(formData: FormData, folderName: string): Promise<AxiosResponse> {
        return await api.post('/upload_files', formData, {
            headers: {'FolderName': folderName}
        })
    }

    static async renameFolder(folderId: number, newFolderName: string): Promise<AxiosResponse> {
        return await api.patch('/rename_folder', {
            folderId,
            newFolderName
        })
    }

    static async renameFile(fileId: number, newFileName: string): Promise<AxiosResponse> {
        return await api.patch('/rename_file', {
            fileId,
            newFileName
        })
    }
    // static async uploadFiles(): Promise<AxiosResponse>{
    //     return await api.
    // }
}