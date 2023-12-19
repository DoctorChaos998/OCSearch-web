import React, {useRef} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/index";
import {fileSystemActions} from "@/store/slices/fileSystemSlice/fileSystemSlice";
import {IFile, IFolder} from "@/entities/fileSystem";

export function useSelectFileSystemItems(fileSystemItemsList: (IFile|IFolder)[]){
    const selectedFileSystemItemIds = useAppSelector(state => state.fileSystemReducer.selectedFileSystemItemIds);
    const dispatch = useAppDispatch();
    const selectedFileIndex = useRef<number>(0);
    return (event: React.MouseEvent<HTMLDivElement>, fileSystemItemId: number, fileSystemItemIndex: number) => {
        event.stopPropagation();
        if(selectedFileSystemItemIds.length === 0){
            selectedFileIndex.current = 0;
        }
        if(event.ctrlKey){
            selectedFileIndex.current = fileSystemItemIndex;
            dispatch(fileSystemActions.addSelectItem(fileSystemItemId));
        }
        else if(event.shiftKey){
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
            selectedFileIndex.current = fileSystemItemIndex;
            dispatch(fileSystemActions.selectItemOnce(fileSystemItemId));
        }
    }
}