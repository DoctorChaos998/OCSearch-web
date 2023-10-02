import {AppDispatch} from "@/store";
import FileService from "@/app/(content)/files/Api/Api";
import {fileSystemSlice} from "@/app/(content)/files/Store/FileSystem/FileSystemSlise";
import {IFileCatalogItem} from "@/entites/files/fileCatalogItem";
import {notificationSlice} from "@/components/Notification/store/NotificationSlice";
import {AxiosError} from "axios";

export const checkFileName = (fileName: string) => async (dispatch: AppDispatch) =>{
    try {
        if(fileName === "111"){
            dispatch(fileSystemSlice.actions.setIsModalVisible(false))
        }
        else {
            dispatch(fileSystemSlice.actions.setInputError(true))
        }
        //const response = await FileService.checkFileName(fileName)
    } catch (e: any) {
    }
}
export const uploadsFile = (folderName: string, fileList: FileList) => async (dispatch: AppDispatch) => {
    try {
        await FileService.checkFolderName(folderName);
        dispatch(notificationSlice.actions.createNotificationWithTimer('first state'))
        const formData = new FormData()
        Array.prototype.forEach.call(fileList,(file) => {
            formData.append(file.name,file)
        })
        console.log(formData)
        await FileService.uploadFiles(formData, folderName)
        dispatch(fileSystemSlice.actions.closeModalWindowForFileCatalogItemNaming())
    } catch (error: any) {
        if(error.isAxiosError){
            const errorTyped = error as AxiosError<ICheckFolderNameError>;
            if(errorTyped.response?.data.errorCode === 1){
                dispatch(fileSystemSlice.actions.setInputError(true))
                dispatch(notificationSlice.actions.createNotificationWithTimer(errorTyped.response?.data.errorMessage))
            }
            if(errorTyped.response?.data.errorCode === 2){
                dispatch(fileSystemSlice.actions.closeModalWindowForFileCatalogItemNaming())
                dispatch(notificationSlice.actions.createNotificationWithTimer(errorTyped?.response?.data?.errorMessage))
            }
        }
    }
}
export const loadingFolderList = () => async (dispatch: AppDispatch) => {
    try{
        dispatch(fileSystemSlice.actions.loadingFolderList());
        const response = await FileService.getFolders();
        const temp: IFileCatalogItem[] = response.data.map((value) => {
            return {...value, isSelected: false, type: "folder"}
        })
        dispatch(fileSystemSlice.actions.loadingFolderListSuccess(temp))
    } catch (e: any) {
        dispatch(notificationSlice.actions.createNotificationWithTimer("Что то пошло не так"))
    }
}

export const loadingFilesList = (folderId: number) => async (dispatch: AppDispatch) => {
    try{
        dispatch(fileSystemSlice.actions.loadingFileList(folderId))
        const response = await FileService.getFiles(folderId);
        dispatch(fileSystemSlice.actions.loadingFileListSuccess(response.data.map((value) => {
            return {...value, isSelected: false, type: "file"}
        })))
    } catch (e: any) {
        dispatch(notificationSlice.actions.createNotificationWithTimer("Что то пошло не так"))
    }
}

export const deleteFolders = (folderIds: number[]) => async (dispatch: AppDispatch) => {
    try {
        await FileService.deleteFolders(folderIds)
        dispatch(fileSystemSlice.actions.deleteFolders(folderIds))
    } catch (error: any) {
        if(error.isAxiosError){
            const errorTyped = error as AxiosError<IDeleteFolders>
            if(errorTyped.response){
                dispatch(fileSystemSlice.actions.deleteFolders(errorTyped.response.data.deletedFolderIds))
                dispatch(notificationSlice.actions.createNotification(errorTyped.response.data.error))
            }
        }
    }
}

export const deleteFiles = (fileIds: number[]) => async (dispatch: AppDispatch) => {
    try {
        await FileService.deleteFiles(fileIds)
        dispatch(fileSystemSlice.actions.deleteFiles(fileIds))
    } catch (error: any) {
        if(error.isAxiosError){
            const errorTyped = error as AxiosError<IDeleteFiles>
            if(errorTyped.response){
                dispatch(fileSystemSlice.actions.deleteFiles(errorTyped.response.data.deletedFileIds))
                dispatch(notificationSlice.actions.createNotification(errorTyped.response.data.error))
            }
        }
    }
}

export const renameFile = (fileId: number, newFileName:string) => async (dispatch: AppDispatch) => {
    try {
        console.log(fileId, newFileName)
        await FileService.renameFile(fileId, newFileName)
        dispatch(fileSystemSlice.actions.renameFile({fileId, newFileName}));
        dispatch(fileSystemSlice.actions.closeModalWindowForFileCatalogItemNaming())
    } catch (error: any) {
        if(error.isAxiosError){
            const errorTyped = error as AxiosError<{error: string}>
            if(errorTyped.response){
                dispatch(notificationSlice.actions.createNotificationWithTimer(errorTyped.response.data.error))
                dispatch(fileSystemSlice.actions.setInputError(true))
            }
        }
    }
}
export const renameFolder = (folderId: number, newFolderName:string) => async (dispatch: AppDispatch) => {
    try {
        await FileService.renameFolder(folderId, newFolderName)
        dispatch(fileSystemSlice.actions.renameFolder({folderId, newFolderName}));
        dispatch(fileSystemSlice.actions.closeModalWindowForFileCatalogItemNaming())
    } catch (error: any) {
        if(error.isAxiosError){
            const errorTyped = error as AxiosError<{error: string}>
            if(errorTyped.response){
                dispatch(notificationSlice.actions.createNotificationWithTimer(errorTyped.response.data.error))
                dispatch(fileSystemSlice.actions.setInputError(true))
            }
        }
    }
}