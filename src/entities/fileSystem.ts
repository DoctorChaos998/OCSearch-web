export type fileCatalogItemType = 'file'|'folder'
export const validFileExtensions  = ['txt', 'csv', 'zip', 'xlsx']
export type fileStatus = 'uploading'|'uploaded'|'unzipping'|'recoding'|'ready_for_parsing'|'parsing'
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
}

export const allSorterTarget = {
    name: "Name",
    uploadDate: "Upload date",
    size: "Size",
    filesNumber: "Files number",
}

export const fileSorterTargets: {sorterTarget: fileSorterTarget, targetName: string}[] = [
    {sorterTarget: "name", targetName: "Name"},
    {sorterTarget: "uploadDate", targetName: "Upload date"},
    {sorterTarget: "size", targetName: "Size"},
]

export const folderSorterMethods: {sorterTarget: folderSorterTarget, targetName: string}[] = [
    {sorterTarget: "name", targetName: "Name"},
    {sorterTarget: "uploadDate", targetName: "Upload date"},
    {sorterTarget: "filesNumber", targetName: "Files number"},
]
export type fileCatalogItemNamingType = 'createFolder'|'renameFolder'|'renameFile'|null
export type fileSorterTarget = 'name'|'size'|'uploadDate'
export type folderSorterTarget = 'name'|'filesNumber'|'uploadDate'
export type fileSystemSortingOrder = 'byDescending'|'byAscending'
export type fileSystemSortingTarget = 'uploadDate'|'name'|'size'|'filesNumber'