import {AppDispatch} from "@/store";
import {fileSystemActions} from "@/store/slices/fileSystemSlice/fileSystemSlice";
import FileSystemService from "@/http/fileSystemService";
import {
    type IErrorCreateFolder,
} from "@/http/fileSystemService/dataTransferObjects";
import {notificationActions} from "@/store/slices/notificationSlice/notificationSlice";
export const loadingFolderList = () => async (dispatch: AppDispatch) => {
    dispatch(fileSystemActions.loadingFileSystemItems());
    await FileSystemService.getFolders().then(value => {
        dispatch(fileSystemActions.loadingFileSystemFoldersSuccess({currentFolderName: 'All folders', fileSystemItems: value}));
    }).catch();
}
export const loadingFileList = (folderId: number) => async (dispatch: AppDispatch)=> {
    dispatch(fileSystemActions.loadingFileSystemItems());
    await FileSystemService.getFiles(folderId).then(value => {
        dispatch(fileSystemActions.loadingFileSystemFilesSuccess({currentFolderName: value.folderName, fileSystemItems: value.files}));
    }).catch((reason: {status: number, error: string}) => {
        if(reason.status === 404){
            dispatch(fileSystemActions.loadingFileSystemItemsError());
            dispatch(notificationActions.createNotificationWithTimer({notificationMessage: reason.error, notificationType: "warning"}));
        }
    })
}

export const uploadFiles = (fileList: FileList, folderName: string) => async (dispatch: AppDispatch) => {
    await FileSystemService.createFolder(folderName).then(async value => {
        dispatch(fileSystemActions.createFolder(value));
        dispatch(fileSystemActions.closeCreateFolderModalWindow());
        dispatch(notificationActions.createNotificationWithTimer({notificationMessage: 'Uploading has been started', notificationType: "info"}));
        const formData = new FormData();
        Array.prototype.forEach.call(fileList, (file: File) => {
            formData.append(file.name, file);
        });
        await FileSystemService.uploadFiles(formData, value.id).then(() => {
            dispatch(notificationActions.createNotification({notificationMessage: 'Files have been successfully uploaded', notificationType: "info"}));
        }).catch((reason: {error: string, status: number}) => {
            dispatch(notificationActions.createNotification({notificationMessage: reason.error, notificationType: "error"}));
        });
    }).catch((reason: IErrorCreateFolder) => {
        dispatch(fileSystemActions.setCreateFolderModalWindowStatus('error'));
        dispatch(notificationActions.createNotificationWithTimer({notificationMessage: reason.error, notificationType: "warning"}));
    })
}
export const uploadFilesInFolder = (fileList: FileList, folderId: number, userName: string) => async (dispatch: AppDispatch) => {
    const formData = new FormData();
    Array.prototype.forEach.call(fileList, (file: File) => {
        formData.append(file.name, file);
    });
    dispatch(fileSystemActions.createFile({id: Date.now(), uploadedBy: userName, status: 'uploading', uploadDate: null, name: fileList[0].name, size: null}));
    dispatch(notificationActions.createNotificationWithTimer({notificationMessage: 'Uploading has been started', notificationType: "info"}));
    await FileSystemService.uploadFiles(formData, folderId).then(() => {
        dispatch(notificationActions.createNotification({notificationMessage: 'Files have been successfully uploaded', notificationType: "info"}));
    }).catch((reason: {error: string, status: number}) => {
        dispatch(notificationActions.createNotification({notificationMessage: reason.error, notificationType: "error"}));
    });
}

export const renameFolder = (folderId: number, newFolderName: string) => async (dispatch: AppDispatch) => {
    await FileSystemService.renameFolder(folderId, newFolderName).then(() => {
        dispatch(fileSystemActions.renameFileSystemItem({itemId: folderId, newItemName: newFolderName, itemType: 'folder'}));
        dispatch(fileSystemActions.closeRenameModalWindow());
    }).catch((reason: {status: number, error: string}) => {
        if(reason.status === 404){
            dispatch(fileSystemActions.deleteFolders([folderId]));
            dispatch(fileSystemActions.closeRenameModalWindow());
            dispatch(notificationActions.createNotificationWithTimer({notificationMessage: reason.error, notificationType: "error"}));
        }
        if(reason.status === 409){
            dispatch(fileSystemActions.setRenameModalWindowStatus('error'));
            dispatch(notificationActions.createNotificationWithTimer({notificationMessage: reason.error, notificationType: "warning"}));
        }
    })
}

export const renameFile = (fileId: number, newFileName: string) => async (dispatch: AppDispatch) => {
    await FileSystemService.renameFile(fileId, newFileName).then(() => {
        dispatch(fileSystemActions.renameFileSystemItem({itemId: fileId, newItemName: newFileName, itemType: 'file'}));
        dispatch(fileSystemActions.closeRenameModalWindow());
    }).catch((reason: {status: number, error: string}) => {
        if(reason.status === 404){
            dispatch(fileSystemActions.deleteFiles([fileId]));
            dispatch(fileSystemActions.closeRenameModalWindow());
            dispatch(notificationActions.createNotificationWithTimer({notificationMessage: reason.error, notificationType: "error"}));
        }
        if(reason.status === 409){
            dispatch(fileSystemActions.setRenameModalWindowStatus('error'));
            dispatch(notificationActions.createNotificationWithTimer({notificationMessage: reason.error, notificationType: "warning"}));
        }
    })
}

export const deleteFolders = (folderIds: number[]) => async (dispatch: AppDispatch) => {
    await FileSystemService.deleteFolders(folderIds).then(() => {
        dispatch(fileSystemActions.deleteFolders(folderIds));
        dispatch(notificationActions.createNotificationWithTimer({notificationMessage: 'Folders have been successfully deleted', notificationType: 'info'}));
    }).catch((reason: {status: number, error: string, deletedFolderIds: number[]}) => {
        if(reason.status === 422){
            dispatch(fileSystemActions.deleteFolders(reason.deletedFolderIds));
            dispatch(notificationActions.createNotificationWithTimer({notificationMessage: reason.error, notificationType: "error"}));
        }
    })
}

export const deleteFiles = (fileIds: number[]) => async (dispatch: AppDispatch) => {
    await FileSystemService.deleteFiles(fileIds).then(() => {
        dispatch(fileSystemActions.deleteFiles(fileIds));
        dispatch(notificationActions.createNotificationWithTimer({notificationMessage: 'Files have been successfully deleted', notificationType: 'info'}));
    }).catch((reason: {status: number, error: string, deletedFileIds: number[]}) => {
        if(reason.status === 422){
            dispatch(fileSystemActions.deleteFiles(reason.deletedFileIds));
            dispatch(notificationActions.createNotificationWithTimer({notificationMessage: reason.error, notificationType: "error"}));
        }
    })
}