import {type fileStatus} from "@/entities/fileSystem";

export interface IGetFolderResponse {
    id: number
    name: string
    lastUploadDate: string|null
    createdBy: string
    filesNumber: number
}
export interface IErrorCreateFolder{
    error: string
}
export interface IErrorDeleteFolders{
    error: string
    deletedFolderIds: number[]
}

export interface IErrorRenameFolder{
    error: string
}
export interface IGetFileResponse {
    id: number
    name: string
    size: number|null
    uploadDate: string|null
    uploadedBy: string
    status: fileStatus
}

export interface IErrorDeleteFiles{
    error: string
    deletedFileIds: number[]
}

interface ICheckFolderNameError{
    errorCode: number
    errorMessage: string
}