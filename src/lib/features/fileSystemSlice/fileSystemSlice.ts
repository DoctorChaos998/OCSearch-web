import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {
    fileSystemSortingOrder,
    fileSystemSortingTarget,
    IFile,
    IFolder
} from "@/types/fileSystem";
import type {status} from "@/types/slices";

interface IFileSystemSlice{
    status: status,
    fileSystemItems: (IFile|IFolder)[],
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
    fileSystemItems: [],
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
            state.fileSystemItems = [];
            state.selectedFileSystemItemIds = [];
        },
        loadingFileSystemItemsSuccess: (state, action: PayloadAction<{
            currentFolderName: string,
            fileSystemItems: IFolder[]|IFile[]}>) => {
            state.currentFolderName = action.payload.currentFolderName;
            state.status = 'success';
            state.fileSystemItems = action.payload.fileSystemItems;
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
        selectAllItems: (state) => {
            state.selectedFileSystemItemIds = state.fileSystemItems.map((item) => {
                item.isSelected = true;
                return item.id;
            });
        },
        addSelectItem: (state, action: PayloadAction<number>) => {
            if(state.selectedFileSystemItemIds.find(id => id === action.payload)){
                state.selectedFileSystemItemIds = state.selectedFileSystemItemIds.filter(id => id !== action.payload);
                state.fileSystemItems.find(item => item.id === action.payload)!.isSelected = false;
            }
            else {
                state.selectedFileSystemItemIds.push(action.payload);
                state.fileSystemItems.find(item => item.id === action.payload)!.isSelected = true;
            }
        },
        selectItemOnce: (state, action: PayloadAction<number>) => {
            state.selectedFileSystemItemIds = [action.payload];
            state.fileSystemItems.forEach(item => {
                item.isSelected = item.id === action.payload;
            })
        },
        selectItems: (state, action: PayloadAction<number[]>) => {
            state.selectedFileSystemItemIds = action.payload;
            action.payload.forEach(id => {
                const item = state.fileSystemItems.find(item => item.id === id);
                if(item) item.isSelected = true;
            })
        },
        deselectAllItems: (state) => {
            state.selectedFileSystemItemIds = [];
            state.mobileHelper.isActive = false;
            state.fileSystemItems.forEach(item => item.isSelected = false);
        },
        resetFilters: (state) => {
            state.sorter = {order: 'byDescending', target: 'uploadDate'};
            state.searchQuery = '';
            state.selectedFileSystemItemIds = [];
            state.fileSystemItems = [];
            state.mobileHelper.isActive = false;
        },
        createItem: (state, action: PayloadAction<IFolder|IFile>) => {
            state.fileSystemItems.push(action.payload);
            state.selectedFileSystemItemIds.push(action.payload.id);
        },
        openRenameModalWindow: (state, action: PayloadAction<{itemType: 'folder'|'file', itemId: number}>) => {
            state.renameModalWindow = {isVisible: true,
                renameItem: action.payload.itemType,
                initialName: state.fileSystemItems.find((item) => item.id === action.payload.itemId)!.name,
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
            const item = state.fileSystemItems.find((folder) => folder.id === action.payload.itemId)!
            if(action.payload.itemType === 'folder'){
                item.name = action.payload.newItemName;
            }
            else{
                item.name = action.payload.newItemName + item.name.slice(item.name.lastIndexOf('.'));
            }
        },
        deleteItems: (state, action: PayloadAction<number[]>) => {
            state.fileSystemItems = state.fileSystemItems.filter((item) => !action.payload.includes(item.id));
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
            state.itemInfoModalWindow = {
                isVisible: true,
                itemType: action.payload.itemType,
                item: state.fileSystemItems.find(item => item.id === action.payload.itemId)!
            };
        },
        closeItemInfoModalWindow: (state) => {
            state.itemInfoModalWindow = {isVisible: false, item: null, itemType: null};
        }
    }
})

export const {actions: fileSystemActions, reducer: fileSystemReducer} = fileSystemSlice;