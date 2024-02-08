import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {status} from "@/store";
import type {
    fileSorterTarget,
    fileSystemSortingOrder,
    fileSystemSortingTarget,
    IFile,
    IFolder
} from "@/entities/fileSystem";


interface IFileSystemSlice{
    status: status,
    fileSystemItems: {
        folders: IFolder[],
        files: IFile[]
    }
    selectedFileSystemItemIds: number[],
    currentFolderName: string,
    createFolderModalWindow: {
        isVisible: boolean,
        initialName: string,
        status: 'success'|'error'
    },
    renameModalWindow: {
        isVisible: boolean,
        initialName: string,
        status: 'success'|'error',
        renameItem: 'folder'|'file',
        renameItemId: number
    },
    deleteModalWindow: {
        isVisible: boolean,
        deleteItem: 'folder'|'file'
    },
    previewModalWindow: {
        isVisible: boolean,
        fileExtension: 'txt'|'csv'|'xlsx'|'sql'|null,
        fileId: number
    },
    sorter: {
        order: fileSystemSortingOrder,
        target: fileSystemSortingTarget
    },
    searchQuery: string,
    mobileHelper: {
        isActive: boolean
    }
    itemInfoModalWindow: {
        isVisible: boolean,
        item: IFile|IFolder|null,
        itemType: 'folder'|'file'|null
    }
}
const initialState: IFileSystemSlice = {
    status: "initial",
    fileSystemItems: {
        folders: [],
        files: []
    },
    selectedFileSystemItemIds: [],
    currentFolderName: 'All folders',
    createFolderModalWindow: {
        isVisible: false,
        initialName: '',
        status: 'success'
    },
    renameModalWindow: {
        isVisible: false,
        initialName: '',
        status: 'success',
        renameItem: 'folder',
        renameItemId: 0
    },
    deleteModalWindow: {
        isVisible: false,
        deleteItem: "folder"
    },
    previewModalWindow: {
        isVisible: false,
        fileExtension: null,
        fileId: 0
    },
    sorter: {
        order: 'byDescending',
        target: 'uploadDate',
    },
    searchQuery: '',
    mobileHelper: {
        isActive: false
    },
    itemInfoModalWindow: {
        isVisible: false,
        item: null,
        itemType: null
    }
}

const fileSystemSlice = createSlice({
    name: 'fileSystemSlice',
    initialState,
    reducers: {
        loadingFileSystemItems: (state) => {
            state.status = 'loading';
            state.fileSystemItems = {files: [], folders: []};
            state.selectedFileSystemItemIds = [];
        },
        loadingFileSystemFilesSuccess: (state, action: PayloadAction<{
            currentFolderName: string,
            fileSystemItems: IFile[]}>) => {
            state.fileSystemItems.files = action.payload.fileSystemItems;
            state.currentFolderName = action.payload.currentFolderName;
            state.status = 'success';
        },
        loadingFileSystemFoldersSuccess: (state, action: PayloadAction<{
            currentFolderName: string,
            fileSystemItems: IFolder[]}>) => {
            state.fileSystemItems.folders = action.payload.fileSystemItems;
            state.currentFolderName = action.payload.currentFolderName;
            state.status = 'success';
        },
        loadingFileSystemItemsError: (state) => {
            state.status = 'error';
        },
        openCreateFolderModalWindow: (state, action: PayloadAction<string>) => {
            state.createFolderModalWindow = {isVisible: true, initialName: action.payload, status: 'success'};
        },
        setCreateFolderModalWindowStatus: (state, action: PayloadAction<'error'|'success'>) => {
            state.createFolderModalWindow.status = action.payload;
        },
        closeCreateFolderModalWindow: (state) => {
            state.createFolderModalWindow = {isVisible: false, initialName: '', status: 'success'};
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setSorterOrder: (state, action: PayloadAction<fileSystemSortingOrder>) => {
            state.sorter.order = action.payload;
        },
        setSorterTarget: (state, action: PayloadAction<fileSystemSortingTarget>) => {
            state.sorter.target = action.payload;
        },
        selectAllItems: (state,action: PayloadAction<'files'|'folders'>) => {
            if(action.payload === 'files'){
                state.selectedFileSystemItemIds = state.fileSystemItems.files.map((item) => item.id);
            }
            else state.selectedFileSystemItemIds = state.fileSystemItems.folders.map((item) => item.id);

        },
        addSelectItem: (state, action: PayloadAction<number>) => {
            if(state.selectedFileSystemItemIds.find(id => id === action.payload)){
                state.selectedFileSystemItemIds = state.selectedFileSystemItemIds.filter(id => id !== action.payload);
            }
            else {
                state.selectedFileSystemItemIds.push(action.payload);
            }
        },
        selectItemOnce: (state, action: PayloadAction<number>) => {
            state.selectedFileSystemItemIds = [action.payload];
        },
        selectItems: (state, action: PayloadAction<number[]>) => {
            state.selectedFileSystemItemIds = action.payload;
        },
        deselectAllItems: (state) => {
            state.selectedFileSystemItemIds = [];
            state.mobileHelper.isActive = false;
        },
        resetFilters: (state) => {
            state.sorter = {order: 'byDescending', target: 'uploadDate'};
            state.searchQuery = '';
            state.selectedFileSystemItemIds = [];
            state.fileSystemItems = {files: [], folders: []};
            state.mobileHelper.isActive = false;
        },
        createFolder: (state, action: PayloadAction<IFolder>) => {
            state.fileSystemItems.folders.push(action.payload);
            state.selectedFileSystemItemIds.push(action.payload.id);
        },
        createFile: (state, action: PayloadAction<IFile>) => {
            state.fileSystemItems.files.push(action.payload);
            state.selectedFileSystemItemIds.push(action.payload.id);
        },
        openRenameModalWindow: (state, action: PayloadAction<{itemType: 'folder'|'file', itemId: number}>) => {
            state.renameModalWindow = {isVisible: true,
                renameItem: action.payload.itemType,
                initialName: action.payload.itemType === 'folder'?
                    state.fileSystemItems.folders.find((folder) => folder.id === action.payload.itemId)!.name:
                    state.fileSystemItems.files.find((file) => file.id === action.payload.itemId)!.name,
                status: 'success',
                renameItemId: action.payload.itemId
            };
        },
        setRenameModalWindowStatus: (state, action: PayloadAction<'error'|'success'>) => {
            state.renameModalWindow.status = action.payload;
        },
        closeRenameModalWindow: (state) => {
            state.renameModalWindow = {isVisible: false, initialName: '', status: 'success', renameItem: 'folder', renameItemId: 0};
        },
        renameFileSystemItem: (state, action: PayloadAction<{itemType: 'folder'|'file', itemId: number, newItemName: string}>) => {
            if(action.payload.itemType === 'folder'){
                state.fileSystemItems.folders.find((folder) => folder.id === action.payload.itemId)!.name = action.payload.newItemName;
            }
            else{
                const file = state.fileSystemItems.files.find((file) => file.id === action.payload.itemId);
                file!.name = action.payload.newItemName + file!.name.slice(file!.name.lastIndexOf('.'));
            }
        },
        deleteFolders: (state, action: PayloadAction<number[]>) => {
            state.fileSystemItems.folders = state.fileSystemItems.folders.filter((folder) => !action.payload.includes(folder.id));
            state.selectedFileSystemItemIds = [];
        },
        deleteFiles: (state, action: PayloadAction<number[]>) => {
            state.fileSystemItems.files = state.fileSystemItems.files.filter((file) => !action.payload.includes(file.id));
            state.selectedFileSystemItemIds = [];
        },
        openDeleteModalWindow: (state, action: PayloadAction<'file'|'folder'>) => {
            state.deleteModalWindow = {deleteItem: action.payload, isVisible: true};
        },
        closeDeleteModalWindow: (state) => {
            state.deleteModalWindow = {deleteItem: 'folder', isVisible: false};
        },
        openPreviewModalWindow: (state, action: PayloadAction<{fileExtension: 'txt'|'csv'|'xlsx'|'sql', fileId: number}>) => {
            state.previewModalWindow = {isVisible: true, fileId: action.payload.fileId, fileExtension: action.payload.fileExtension};
        },
        closePreviewModalWindow: (state) => {
            state.previewModalWindow = {isVisible: false, fileExtension: null, fileId: 0};
        },
        openMobileHelper: (state) => {
            state.mobileHelper.isActive = true;
        },
        openItemInfoModalWindow: (state, action: PayloadAction<{itemType: 'folder'|'file', itemId: number}>) => {
            state.itemInfoModalWindow = {isVisible: true, itemType: action.payload.itemType,
                item: action.payload.itemType === 'folder'?state.fileSystemItems.folders.find(folder => folder.id === action.payload.itemId)!:
                    state.fileSystemItems.files.find(file => file.id === action.payload.itemId)!
            };
        },
        closeItemInfoModalWindow: (state) => {
            state.itemInfoModalWindow = {isVisible: false, item: null, itemType: null};
        }
    }
})

export const {actions: fileSystemActions, reducer: fileSystemReducer} = fileSystemSlice;