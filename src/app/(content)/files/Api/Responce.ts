interface ICheckFileNameResponse {
    status: boolean
}
interface IGetFolders {
    id: number
    name: string
    uploadDate: string
    uploadUserName: string
    filesNumber: number
}

interface IGetFiles {
    id: number
    name: string
    size: number
    uploadDate: string
    status: string
}

interface IDeleteFolders{
    error: string
    deletedFolderIds: number[]
}

interface IDeleteFiles{
    error: string
    deletedFileIds: number[]
}

interface ICheckFolderNameError{
    errorCode: number
    errorMessage: string
}