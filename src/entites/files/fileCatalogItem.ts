type fileCatalogItemType = 'file'|'folder'
export interface IFileCatalogItem{
    id:number
    name: string
    uploadDate: string | null
    uploadUserName?: string
    filesNumber?: number
    isSelected: boolean
    type: fileCatalogItemType
    size?: number
}

export const allSortMethod = {
    name: "имени",
    uploadDate: "дате загрузки",
    size: "размеру",
    filesNumber: "кол-ву файлов"
}

export const filesSortMethod: {sortMethod: fileCatalogSortingMethodForFile, sortName: string}[] = [
    {sortMethod: "name", sortName: "имени"},
    {sortMethod: "uploadDate", sortName: "дате загрузки"},
    {sortMethod: "size", sortName: "размеру"},
]


export const foldersSortMethod: {sortMethod: fileCatalogSortingMethodForFolder, sortName: string}[] = [
    {sortMethod: "name", sortName: "имени"},
    {sortMethod: "uploadDate", sortName: "дате загрузки"},
    {sortMethod: "filesNumber", sortName: "кол-ву файлов"},
]
export type fileCatalogItemNamingType = 'createFolder'|'renameFolder'|'renameFile'|null
export type fileCatalogSortingMethodForFile = 'name'|'size'|'uploadDate'
export type fileCatalogSortingMethodForFolder = 'name'|'filesNumber'|'uploadDate'
export type sortingType = 'byDescending'|'byAscending'
