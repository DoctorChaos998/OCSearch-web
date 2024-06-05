import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {
    fileSystemItemType,
    fileSystemSortingOrder,
    fileSystemSortingType,
    IFile,
    IFolder
} from "@/types/fileSystem";
import type {status} from "@/types/slices";

interface IFileSystemSlice{
    status: status,
    fileSystemItems: (IFile|IFolder)[],
    selectedFileSystemItemIds: number[],
    currentFolderName: string,
    mobileHelper: {
        isActive: boolean
    }
    folderCreationPopup: {
        isVisible: boolean,
        initialName: string,
        isError: boolean
    },
    itemRenamingPopup: {
        isVisible: boolean,
        initialName: string,
        isError: boolean,
        renameItem: fileSystemItemType,
        renameItemId: number
    },
    itemDeletionPopup: {
        isVisible: boolean,
        deleteItem: fileSystemItemType
    },
    previewPopup: {
        isVisible: boolean,
        fileId: number
    },
    itemInfoPopup: {
        isVisible: boolean,
        item: IFile|IFolder|null,
        itemType: fileSystemItemType
    }
    sorting: {
        order: fileSystemSortingOrder,
        type: fileSystemSortingType
    },
    searchQuery: string,
}
const initialState: IFileSystemSlice = {
    status: "initial",
    fileSystemItems: [],
    selectedFileSystemItemIds: [],
    currentFolderName: 'All folders',
    mobileHelper: {
        isActive: false
    },
    folderCreationPopup: {
        isVisible: false,
        initialName: '',
        isError: false
    },
    itemRenamingPopup: {
        isVisible: false,
        initialName: '',
        renameItem: null,
        renameItemId: 0,
        isError: false
    },
    itemDeletionPopup: {
        isVisible: false,
        deleteItem: null
    },
    previewPopup: {
        isVisible: false,
        fileId: 0
    },
    itemInfoPopup: {
        isVisible: false,
        item: null,
        itemType: null
    },
    sorting: {
        order: 'byDescending',
        type: 'uploadDate',
    },
    searchQuery: '',
}

const fileSystemSlice = createSlice({
    name: 'fileSystemSlice',
    initialState,
    reducers: {
        loadingFileSystemItems: (state) => {
            state.status = 'loading';
            state.fileSystemItems = [];
            state.selectedFileSystemItemIds = [];
            state.sorting = {order: 'byDescending', type: 'uploadDate'};
            state.searchQuery = '';
            state.mobileHelper.isActive = false;
        },
        loadingFileSystemItemsSuccess: (state, action: PayloadAction<{
            currentFolderName: string,
            fileSystemItems: IFolder[]|IFile[]}>) => {
            state.currentFolderName = action.payload.currentFolderName;
            state.status = 'success';
            if(!state.selectedFileSystemItemIds.length) state.fileSystemItems = action.payload.fileSystemItems;
            else {
                const tempItemIds: number[] = [];
                state.fileSystemItems = action.payload.fileSystemItems.map(item => {
                    tempItemIds.push(item.id);
                    if(state.selectedFileSystemItemIds.includes(item.id)) item.isSelected = true;
                    return item;
                });
                state.selectedFileSystemItemIds = state.selectedFileSystemItemIds.filter(id => tempItemIds.includes(id));
            }
        },
        loadingFileSystemItemsError: (state) => {
            state.status = 'error';
        },
        openFolderCreationPopup: (state, action: PayloadAction<string>) => {
            state.folderCreationPopup = {isVisible: true, initialName: action.payload, isError: false};
        },
        setFolderCreationPopupError: (state, action: PayloadAction<boolean>) => {
            state.folderCreationPopup.isError = action.payload;
        },
        closeFolderCreationPopup: (state) => {
            state.folderCreationPopup = {isVisible: false, initialName: '', isError: false};
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setSortingOrder: (state, action: PayloadAction<fileSystemSortingOrder>) => {
            state.sorting.order = action.payload;
        },
        setSortingType: (state, action: PayloadAction<fileSystemSortingType>) => {
            state.sorting.type = action.payload;
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
        createItem: (state, action: PayloadAction<IFolder|IFile>) => {
            state.fileSystemItems.push(action.payload);
            state.selectedFileSystemItemIds.push(action.payload.id);
        },
        openItemRenamingPopup: (state, action: PayloadAction<{itemType: 'folder'|'file', itemId: number}>) => {
            state.itemRenamingPopup = {isVisible: true,
                renameItem: action.payload.itemType,
                initialName: state.fileSystemItems.find((item) => item.id === action.payload.itemId)!.name,
                renameItemId: action.payload.itemId,
                isError: false
            };
        },
        setItemRenamingPopupError: (state, action: PayloadAction<boolean>) => {
            state.itemRenamingPopup.isError = action.payload;
        },
        closeItemRenamingPopup: (state) => {
            state.itemRenamingPopup = {isVisible: false, initialName: '', isError: false, renameItem: null, renameItemId: 0};
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
        openItemDeletionPopup: (state, action: PayloadAction<'file'|'folder'>) => {
            state.itemDeletionPopup = {deleteItem: action.payload, isVisible: true};
        },
        closeItemDeletionPopup: (state) => {
            state.itemDeletionPopup = {deleteItem: 'folder', isVisible: false};
        },
        openPreviewPopup: (state, action: PayloadAction<number>) => {
            state.previewPopup = {isVisible: true, fileId: action.payload};
        },
        closePreviewPopup: (state) => {
            state.previewPopup = {isVisible: false, fileId: 0};
        },
        openMobileHelper: (state) => {
            state.mobileHelper.isActive = true;
        },
        openItemInfoPopup: (state, action: PayloadAction<{itemType: 'folder'|'file', itemId: number}>) => {
            state.itemInfoPopup = {
                isVisible: true,
                itemType: action.payload.itemType,
                item: state.fileSystemItems.find(item => item.id === action.payload.itemId)!
            };
        },
        closeItemInfoPopup: (state) => {
            state.itemInfoPopup = {isVisible: false, item: null, itemType: null};
        }
    }
})

export const {actions: fileSystemActions, reducer: fileSystemReducer} = fileSystemSlice;