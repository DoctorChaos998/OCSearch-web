'use client'
import classes from "./files.module.css";
import FileSelectArea from "@/components/FileSystem/FileSelectArea/FileSelectArea";
import FileCatalog from "@/components/FileSystem/FileCatalog/FileCatalog";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {notificationSlice} from "@/components/Notification/store/NotificationSlice";
import React, {useEffect} from "react";
import {loadingFolderList} from "@/app/(content)/files/Store/FileSystem/FileSystemActions";
import {fileSystemSlice} from "@/app/(content)/files/Store/FileSystem/FileSystemSlise";

const Files = () => {
    const dispatch = useAppDispatch()
    const {isFirstLoading, selectedFileSystemObjectIds} = useAppSelector(state => state.fileSystemReducer)
    useEffect(() => {
        if(isFirstLoading){
            dispatch(loadingFolderList()).then()
        }
    },[])
    const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if(selectedFileSystemObjectIds.length !== 0)
            dispatch(fileSystemSlice.actions.dropSelectedFiles())
    }
    const dragEnterHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        dispatch(fileSystemSlice.actions.setIsModalForDragAndDropAreaVisible(true))
    }
    return (
        <div className={classes.eventListenerFilePage} onClick={onClick} onDragEnter={dragEnterHandler} onDrop={(event) => console.log("dropnet")}>
            <div className={classes.contentOnProfilePage}>
                <FileCatalog></FileCatalog>
            </div>
        </div>
    );
};

export default Files;