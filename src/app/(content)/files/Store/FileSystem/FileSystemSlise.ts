import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    fileCatalogItemNamingType,
    fileCatalogSortingMethodForFile,
    fileCatalogSortingMethodForFolder,
    IFileCatalogItem, sortingType
} from "@/entites/files/fileCatalogItem";


interface IFileSystem{
    loadingFiles: boolean
    modalForFileCatalogItemNamingIsVisible: boolean
    modalForFileCatalogItemNamingError: boolean
    initialNameForRename: string
    fileCatalogItemNamingType: fileCatalogItemNamingType
    currentFolderId: number
    folderList: IFileCatalogItem[]
    fileList: IFileCatalogItem[]
    isFirstLoading: boolean
    selectedFileSystemObjectIds: number[]
    sortingMethod: fileCatalogSortingMethodForFile|fileCatalogSortingMethodForFolder
    sortingType: sortingType
    searchQuery: string
    isModalForDragAndDropAreaVisible: boolean
    modalForDeleteItemIsVisible: boolean

}
const initialState: IFileSystem = {
    modalForFileCatalogItemNamingIsVisible: false,
    modalForFileCatalogItemNamingError:false,
    currentFolderId: 0,
    folderList: [],
    fileList: [],
    loadingFiles: false,
    isFirstLoading: true,
    selectedFileSystemObjectIds: [],
    sortingMethod: 'uploadDate',
    sortingType: 'byDescending',
    searchQuery: '',
    isModalForDragAndDropAreaVisible: false,
    fileCatalogItemNamingType: null,
    modalForDeleteItemIsVisible: false,
    initialNameForRename: '',
}
export const fileSystemSlice = createSlice({
    name: "FileSystemSlice",
    initialState,
    reducers: {
        loadingFolderList(state){
            state.loadingFiles = true;
        },
        loadingFolderListSuccess(state, action: PayloadAction<IFileCatalogItem[]>){
            state.folderList = action.payload;
            state.loadingFiles = false;
            state.isFirstLoading = false;
        },
        loadingFileList(state, action: PayloadAction<number>){
            state.loadingFiles = true;
            state.currentFolderId = action.payload
            state.searchQuery = '';
            state.sortingMethod = 'uploadDate';
            state.sortingType = 'byDescending'
        },
        loadingFileListSuccess(state, action: PayloadAction<IFileCatalogItem[]>){
            state.fileList = action.payload;
            state.loadingFiles = false;
            state.isFirstLoading = false;
        },
        setCurrentFolder(state, action: PayloadAction<number>){
            state.searchQuery = '';
            state.sortingMethod = 'uploadDate';
            state.currentFolderId = action.payload;
            state.sortingType = 'byDescending'
        },
        setIsActiveFileSystemObjectOnce(state, action: PayloadAction<number>){
            if(state.currentFolderId){
                state.fileList = state.fileList.map((value) => {
                    if(value.id === action.payload)
                        return {...value, isSelected: !value.isSelected}
                    else return {...value, isSelected: false}
                })
            }
            else {
                state.folderList = state.folderList.map((value) => {
                    if(value.id === action.payload)
                        return {...value, isSelected: !value.isSelected}
                    else return {...value, isSelected: false}
                })
            }
            state.selectedFileSystemObjectIds = [action.payload]
        },
        setIsActiveFileSystemObjects(state, action: PayloadAction<number>){
            const temp: number[] = []
            if(state.currentFolderId){
                state.fileList = state.fileList.map((value) => {
                    if(value.id === action.payload)
                        return {...value, isSelected: !value.isSelected}
                    else return {...value}
                })
                state.fileList.forEach((value) => {
                    if(value.isSelected){
                        temp.push(value.id)
                    }
                })
            }
            else {
                state.folderList = state.folderList.map((value) => {
                    if(value.id === action.payload)
                        return {...value, isSelected: !value.isSelected}
                    else return {...value}
                })
                state.folderList.forEach((value) => {
                    if(value.isSelected){
                        temp.push(value.id)
                    }
                })
            }
            state.selectedFileSystemObjectIds = temp
        },
        setSortingMethod(state, action: PayloadAction<fileCatalogSortingMethodForFile|fileCatalogSortingMethodForFolder>){
            state.sortingMethod = action.payload
        },
        setSearchQuery(state, action: PayloadAction<string>){
            state.searchQuery = action.payload
        },
        dropSelectedFiles(state){
            if(state.currentFolderId){
                state.fileList = state.fileList.map((value) => {
                    return {...value, isSelected: false}
                })
            }
            else {
                state.folderList = state.folderList.map((value) => {
                    return {...value, isSelected: false}
                })
            }
            state.selectedFileSystemObjectIds = []
        },
        setIsModalVisible(state,action: PayloadAction<boolean>){
            state.modalForFileCatalogItemNamingIsVisible = action.payload
        },
        setInputError(state, action: PayloadAction<boolean>) {
            state.modalForFileCatalogItemNamingError = action.payload
        },
        setIsModalForDragAndDropAreaVisible(state, action:PayloadAction<boolean>){
            state.isModalForDragAndDropAreaVisible = action.payload
        },
        closeModalWindowForFileCatalogItemNaming(state){
            state.modalForFileCatalogItemNamingError = false;
            state.modalForFileCatalogItemNamingIsVisible = false;
            state.fileCatalogItemNamingType = null;
            state.initialNameForRename = '';
        },
        openModalWindowForFileCatalogItemNaming(state, action: PayloadAction<{fileCatalogItemNamingType: fileCatalogItemNamingType, initialName: string}>){
            state.fileCatalogItemNamingType = action.payload.fileCatalogItemNamingType;
            state.initialNameForRename = action.payload.initialName;
            state.modalForFileCatalogItemNamingIsVisible = true;
        },
        setModalForDeleteItemIsVisible(state, action: PayloadAction<boolean>){
            state.modalForDeleteItemIsVisible = action.payload;
        },
        deleteFolders(state, action: PayloadAction<number[]>){
            state.folderList = state.folderList.filter((value) => {
                return !action.payload.includes(value.id);
            })
        },
        deleteFiles(state, action: PayloadAction<number[]>){
            state.fileList = state.fileList.filter((value) => {
                return !action.payload.includes(value.id);
            })
        },
        setSortingType(state, action: PayloadAction<sortingType>){
            state.sortingType = action.payload;
        },
        renameFile(state, action: PayloadAction<{fileId: number, newFileName: string}>){
            const temp = state.fileList.findIndex((value) => value.id === action.payload.fileId);
            state.fileList[temp].name = action.payload.newFileName;
        },
        renameFolder(state, action: PayloadAction<{folderId: number, newFolderName: string}>){
            const temp = state.folderList.findIndex((value) => value.id === action.payload.folderId);
            state.fileList[temp].name = action.payload.newFolderName;
        }
    }
})
export default fileSystemSlice.reducer