import {fileSystemActions} from "@/lib/features/fileSystemSlice/fileSystemSlice";
import FileSystemService from "@/http/fileSystemService";
import {getId} from "@/helpers/uploadingProcessHelper";
import {notificationActions} from "@/lib/features/notificationSlice/notificationSlice";
import {uploadingProcessActions} from "@/lib/features/uploadingProcessSlice/uploadingProcessSlice";
import {fileSizeToString} from "@/helpers/fileSystemHelper";
import {AppDispatch} from "@/lib/store";
import {IApiError} from "@/types/api";

export const loadingFolderList = () => (dispatch: AppDispatch) => {
    FileSystemService.getFolders().then(value => {
        dispatch(fileSystemActions.loadingFileSystemItemsSuccess({currentFolderName: 'All folders', fileSystemItems: value.map(item => ({...item, isSelected: false}))}));
    }).catch((reason: IApiError) => {
        dispatch(notificationActions.createNotification({notificationMessage: reason.error, notificationType: 'error'}));
    });
}

export const loadingFileList = (folderId: number) => (dispatch: AppDispatch)=> {
    FileSystemService.getFiles(folderId).then(value => {
        dispatch(fileSystemActions.loadingFileSystemItemsSuccess({currentFolderName: value.folderName, fileSystemItems: value.files.map(item => ({...item, isSelected: false}))}));
    }).catch((reason: IApiError) => {
        if(reason.status === 404){
            dispatch(fileSystemActions.loadingFileSystemItemsError());
            dispatch(notificationActions.createNotificationWithTimer({notificationMessage: reason.error, notificationType: "warning"}));
        }
    })
}

export const uploadFiles = (fileList: FileList, folderName: string) => (dispatch: AppDispatch) => {
    FileSystemService.createFolder(folderName).then(value => {
        dispatch(fileSystemActions.createItem({...value, isSelected: false}));
        dispatch(fileSystemActions.closeFolderCreationPopup());
        dispatch(uploadFilesInFolder(fileList, value.id));
    }).catch((reason: IApiError) => {
        dispatch(fileSystemActions.setFolderCreationPopupError(true));
        dispatch(notificationActions.createNotificationWithTimer({notificationMessage: reason.error, notificationType: "warning"}));
    })
}

export const uploadFilesInFolder = (fileList: FileList, folderId: number) => (dispatch: AppDispatch) => {
    dispatch(notificationActions.createNotificationWithTimer({notificationMessage: 'Uploading has been started', notificationType: "info"}));
    const formData = new FormData();
    Array.prototype.forEach.call(fileList, (file: File) => {
        formData.append(file.name, file);
    });
    const uploadId = getId();
    const result = {filesSize: 0, filesNumber: 0};
    Array.prototype.forEach.call(fileList, (file: File) => {
        result.filesNumber++;
        result.filesSize += file.size;
    });
    dispatch(uploadingProcessActions.addUploading({id: uploadId, firstFileName: fileList[0].name, uploadingSize: fileSizeToString(result.filesSize), filesNumber: result.filesNumber}));
    FileSystemService.uploadFiles(formData, folderId, (progress) => dispatch(uploadingProcessActions.setUploadingProgress({id: uploadId, progress}))).then(() => {
        dispatch(notificationActions.createNotification({notificationMessage: 'Files have been successfully uploaded', notificationType: "info"}));
        dispatch(uploadingProcessActions.setStatusUploading({id: uploadId, status:'success'}));
    }).catch((reason: {error: string, status: number}) => {
        dispatch(notificationActions.createNotification({notificationMessage: reason.error, notificationType: "error"}));
        dispatch(uploadingProcessActions.setStatusUploading({id: uploadId, status:'error'}));
    });
}

export const renameFolder = (folderId: number, newFolderName: string) => async (dispatch: AppDispatch) => {
    await FileSystemService.renameFolder(folderId, newFolderName).then(() => {
        dispatch(fileSystemActions.renameFileSystemItem({itemId: folderId, newItemName: newFolderName, itemType: 'folder'}));
        dispatch(fileSystemActions.closeItemRenamingPopup());
    }).catch((reason: {status: number, error: string}) => {
        if(reason.status === 404){
            dispatch(fileSystemActions.deleteItems([folderId]));
            dispatch(fileSystemActions.closeItemRenamingPopup());
            dispatch(notificationActions.createNotificationWithTimer({notificationMessage: reason.error, notificationType: "error"}));
        }
        if(reason.status === 409){
            dispatch(fileSystemActions.setItemRenamingPopupError(true));
            dispatch(notificationActions.createNotificationWithTimer({notificationMessage: reason.error, notificationType: "warning"}));
        }
    })
}

export const renameFile = (fileId: number, newFileName: string) => async (dispatch: AppDispatch) => {
    await FileSystemService.renameFile(fileId, newFileName).then(() => {
        dispatch(fileSystemActions.renameFileSystemItem({itemId: fileId, newItemName: newFileName, itemType: 'file'}));
        dispatch(fileSystemActions.closeItemRenamingPopup());
    }).catch((reason: {status: number, error: string}) => {
        if(reason.status === 404){
            dispatch(fileSystemActions.deleteItems([fileId]));
            dispatch(fileSystemActions.closeItemRenamingPopup());
            dispatch(notificationActions.createNotificationWithTimer({notificationMessage: reason.error, notificationType: "error"}));
        }
        if(reason.status === 409){
            dispatch(fileSystemActions.setItemRenamingPopupError(true));
            dispatch(notificationActions.createNotificationWithTimer({notificationMessage: reason.error, notificationType: "warning"}));
        }
    })
}

export const deleteFolders = (folderIds: number[]) => async (dispatch: AppDispatch) => {
    await FileSystemService.deleteFolders(folderIds).then(() => {
        dispatch(fileSystemActions.deleteItems(folderIds));
        dispatch(notificationActions.createNotificationWithTimer({notificationMessage: 'Folders have been successfully deleted', notificationType: 'info'}));
    }).catch((reason: {status: number, error: string, deletedFolderIds: number[]}) => {
        if(reason.status === 422){
            dispatch(fileSystemActions.deleteItems(reason.deletedFolderIds));
            dispatch(notificationActions.createNotificationWithTimer({notificationMessage: reason.error, notificationType: "error"}));
        }
    })
}

export const deleteFiles = (fileIds: number[]) => async (dispatch: AppDispatch) => {
    await FileSystemService.deleteFiles(fileIds).then(() => {
        dispatch(fileSystemActions.deleteItems(fileIds));
        dispatch(notificationActions.createNotificationWithTimer({notificationMessage: 'Files have been successfully deleted', notificationType: 'info'}));
    }).catch((reason: {status: number, error: string, deletedFileIds: number[]}) => {
        if(reason.status === 422){
            dispatch(fileSystemActions.deleteItems(reason.deletedFileIds));
            dispatch(notificationActions.createNotificationWithTimer({notificationMessage: reason.error, notificationType: "error"}));
        }
    })
}