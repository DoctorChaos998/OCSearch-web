'use client'
import React, {FC, memo, useRef} from 'react';
import {IFileCatalogItem} from "@/entites/files/fileCatalogItem";
import FileCatalogItem from "@/ui/cards/FileCatalogItem/FileCatalogItem";
import classes from "./FileList.module.css";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {fileSystemSlice} from "@/app/(content)/files/Store/FileSystem/FileSystemSlise";
import {loadingFilesList} from "@/app/(content)/files/Store/FileSystem/FileSystemActions";

interface IFileListProps {
    fileList: IFileCatalogItem[]
}
const FileList: FC<IFileListProps> = memo(({fileList}) => {
    const firstSelectedObject = useRef<number>(0)
    const secondSelectedObject = useRef<number>(0)
    const {selectedFileSystemObjectIds} = useAppSelector(state => state.fileSystemReducer)
    const dispatch = useAppDispatch();
    const onClickHandler = (event: React.MouseEvent<HTMLDivElement>, id: number, index: number) =>{
        if(selectedFileSystemObjectIds.length === 0){
            firstSelectedObject.current = 0;
            secondSelectedObject.current = 0;
        }
        event.stopPropagation()
        if(event.ctrlKey){
            firstSelectedObject.current = index;
            dispatch(fileSystemSlice.actions.setIsActiveFileSystemObjects(id));
        }
        else if(event.shiftKey){
            // console.log(firstSelectedObject,secondSelectedObject)
            const tempArray: number[] = []
            if(index > firstSelectedObject.current){
                for(let i: number = firstSelectedObject.current;i<=index;i++){
                    tempArray.push(fileList[i].id)
                }
            }
            else {
                for(let i: number = index;i<=firstSelectedObject.current;i++){
                    tempArray.push(fileList[i].id)
                }
            }
            // secondSelectedObject.current = index;
            dispatch(fileSystemSlice.actions.dropSelectedFiles())
            tempArray.forEach(value => {dispatch(fileSystemSlice.actions.setIsActiveFileSystemObjects(value))})
        }
        else {
            firstSelectedObject.current = index;
            secondSelectedObject.current = 0;
            dispatch(fileSystemSlice.actions.setIsActiveFileSystemObjectOnce(id));
        }
    }
    const onDoubleClickHandler = (event: React.MouseEvent<HTMLDivElement>, type: string, id: number) =>{
        event.stopPropagation()
        if(type === "folder"){
            dispatch(fileSystemSlice.actions.dropSelectedFiles())
            dispatch(loadingFilesList(id)).then()
        }
        return
    }
    return (
        <div className={classes.fileList}>
            {fileList.map((fileCatalogItem, index) => <FileCatalogItem onDoubleClickFolderCardHandler={onDoubleClickHandler} onClick={onClickHandler} entity={fileCatalogItem} key={fileCatalogItem.id} index={index}/>)}
        </div>
    );
});

export default FileList;