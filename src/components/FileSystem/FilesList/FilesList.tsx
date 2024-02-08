import React, {FC, memo} from 'react';
import {type IFile} from "@/entities/fileSystem";
import FileSystemFile from "@/components/FileSystem/File/FileSystemFile";
import {useSelectFileSystemItems} from "@/hooks/selectFileSystemItems";
import {useAppDispatch} from "@/hooks";
import {fileSystemActions} from "@/store/slices/fileSystemSlice/fileSystemSlice";
import classes from "./FileList.module.scss";
import {notificationActions} from "@/store/slices/notificationSlice/notificationSlice";
interface IFileListProps{
    fileList: IFile[]
}
const FilesList: FC<IFileListProps> = ({fileList}) => {
    const onFileClickHandler = useSelectFileSystemItems(fileList);
    const dispatch = useAppDispatch();
    return (
        fileList.length===0?
            <h1 className={classes.header}>
                Files not exist
            </h1>
            :
            fileList.map((file, index) => <FileSystemFile key={file.id} file={file}
                                                           onClickHandler={onFileClickHandler}
                                                           onDoubleClickHandler={() => {
                                                               if(file.status === 'ready_for_parsing') dispatch(fileSystemActions.openPreviewModalWindow({
                                                                   fileExtension: file.name.substring(file.name.lastIndexOf('.')) as 'txt'|'sql'|'csv'|'xlsx',
                                                                   fileId: file.id}));
                                                               else dispatch(notificationActions.createNotification({notificationMessage: 'File is being processed', notificationType: 'warning'}))

                                                           }}
                                                           index={index}/>)
    );
};

export default memo(FilesList);