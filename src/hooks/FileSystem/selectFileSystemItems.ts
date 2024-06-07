import {useRef} from "react";
import {fileSystemActions} from "@/lib/features/fileSystemSlice/fileSystemSlice";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import type {keyForSelect} from "@/types/fileSystem";

export function useSelectFileSystemItems(fileSystemItemIdsList: number[]){
    const selectedFileSystemItemIds = useAppSelector(state => state.fileSystemReducer.selectedFileSystemItemIds.length);
    const mobileHelperIsActive = useAppSelector(state => state.fileSystemReducer.mobileHelper.isActive);
    const dispatch = useAppDispatch();
    const indexOfThePreviousSelectedItem = useRef<number>(0);

    return (keyForSelect: keyForSelect, fileSystemItemId: number, fileSystemItemIndex: number) => {
        if(!selectedFileSystemItemIds){
            indexOfThePreviousSelectedItem.current = 0;
        }
        if(keyForSelect === 'ctrl'){
            indexOfThePreviousSelectedItem.current = fileSystemItemIndex;
            dispatch(fileSystemActions.addSelectItem(fileSystemItemId));
        }
        else if(keyForSelect === 'shift'){
            const tempArray: number[] = [];
            if(fileSystemItemIndex > indexOfThePreviousSelectedItem.current){
                for(let i: number = indexOfThePreviousSelectedItem.current;i<=fileSystemItemIndex;i++){
                    tempArray.push(fileSystemItemIdsList[i]);
                }
            }
            else {
                for(let i: number = fileSystemItemIndex;i<=indexOfThePreviousSelectedItem.current;i++){
                    tempArray.push(fileSystemItemIdsList[i]);
                }
            }
            dispatch(fileSystemActions.deselectAllItems());
            dispatch(fileSystemActions.selectItems(tempArray));
        }
        else {
            if(mobileHelperIsActive){
                indexOfThePreviousSelectedItem.current = fileSystemItemIndex;
                dispatch(fileSystemActions.addSelectItem(fileSystemItemId));
            }
            else {
                indexOfThePreviousSelectedItem.current = fileSystemItemIndex;
                dispatch(fileSystemActions.selectItemOnce(fileSystemItemId));
            }
        }
    };
}