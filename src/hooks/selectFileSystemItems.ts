import React, {useRef} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/index";
import {fileSystemActions} from "@/store/slices/fileSystemSlice/fileSystemSlice";
import type {IFile, IFolder, keyForSelect} from "@/entities/fileSystem";

export function useSelectFileSystemItems(fileSystemItemsList: (IFile|IFolder)[]){
    const selectedFileSystemItemIds = useAppSelector(state => state.fileSystemReducer.selectedFileSystemItemIds);
    const mobileHelperIsActive = useAppSelector(state => state.fileSystemReducer.mobileHelper.isActive);
    const dispatch = useAppDispatch();
    const selectedFileIndex = useRef<number>(0);
    return (keyForSelect: keyForSelect, fileSystemItemId: number, fileSystemItemIndex: number) => {
        if(selectedFileSystemItemIds.length === 0){
            selectedFileIndex.current = 0;
        }
        if(keyForSelect === 'ctrl'){
            selectedFileIndex.current = fileSystemItemIndex;
            dispatch(fileSystemActions.addSelectItem(fileSystemItemId));
        }
        else if(keyForSelect === 'shift'){
            const tempArray: number[] = [];
            if(fileSystemItemIndex > selectedFileIndex.current){
                for(let i: number = selectedFileIndex.current;i<=fileSystemItemIndex;i++){
                    tempArray.push(fileSystemItemsList[i].id);
                }
            }
            else {
                for(let i: number = fileSystemItemIndex;i<=selectedFileIndex.current;i++){
                    tempArray.push(fileSystemItemsList[i].id);
                }
            }
            dispatch(fileSystemActions.deselectAllItems());
            dispatch(fileSystemActions.selectItems(tempArray));
        }
        else {
            if(mobileHelperIsActive){
                selectedFileIndex.current = fileSystemItemIndex;
                dispatch(fileSystemActions.addSelectItem(fileSystemItemId));
            }
            else {
                selectedFileIndex.current = fileSystemItemIndex;
                dispatch(fileSystemActions.selectItemOnce(fileSystemItemId));
            }
        }
    }
}