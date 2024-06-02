import {IApiError} from "@/types/api";

export interface IErrorDeleteFolders extends IApiError{
    deletedFolderIds: number[]
}
export interface IErrorDeleteFiles extends IApiError{
    deletedFileIds: number[]
}

export type fileStatus = 'uploading'|'uploaded'|'unzipping'|'converting'|'ready_for_parsing'|'parsing'|'normalizing';

export type keyForSelect = 'shift'|'ctrl'|null;
export interface IFile extends IFileSystemItem{
    size: number|null,
    uploadDate: string|null,
    uploadedBy: string,
    status: fileStatus
}
export interface IFolder extends IFileSystemItem{
    lastUploadDate: string|null,
    createdBy: string,
    filesNumber: number
}
export interface IFileSystemItem{
    id: number,
    name: string,
    isSelected: boolean
}

export type fileSorterTarget = 'name'|'size'|'uploadDate'
export type folderSorterTarget = 'name'|'filesNumber'|'uploadDate'
export type fileSystemSortingOrder = 'byDescending'|'byAscending'
export type fileSystemSortingTarget = 'uploadDate'|'name'|'size'|'filesNumber'
