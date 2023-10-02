import React, {FC} from 'react';
import classes from "./DragAndDropFilesArea.module.css";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {fileSystemSlice} from "@/app/(content)/files/Store/FileSystem/FileSystemSlise";
import {notificationSlice} from "@/components/Notification/store/NotificationSlice";

interface IDragAndDropFilesAreaProps {
    onFileSelect: (fileList: FileList) => void
}
const DragAndDropFilesArea: FC<IDragAndDropFilesAreaProps> = ({onFileSelect}) => {
    const dispatch = useAppDispatch()
    const {} = useAppSelector(state => state.fileSystemReducer)
    const dragEnterHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
    }
    const dragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        dispatch(fileSystemSlice.actions.setIsModalForDragAndDropAreaVisible(false))
    }
    const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        if(event.dataTransfer.files.length === 0){
            dispatch(fileSystemSlice.actions.setIsModalForDragAndDropAreaVisible(false))
            dispatch(notificationSlice.actions.createNotificationWithTimer("Error files type"))
        }
        else {
            onFileSelect(event.dataTransfer.files)
            dispatch(fileSystemSlice.actions.setIsModalForDragAndDropAreaVisible(false))
        }
    }
    return (
        <div className={classes.dragAndDropFilesAreaContainer} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDrop={dropHandler} onDragOver={dragEnterHandler} onClick={(event) => {dispatch(fileSystemSlice.actions.setIsModalForDragAndDropAreaVisible(false))}}>
            {/*<div className={classes.dragAndDropFilesArea} onDrop={dropHandler}></div>*/}
            Drop files zone
        </div>
    );
};

export default DragAndDropFilesArea;