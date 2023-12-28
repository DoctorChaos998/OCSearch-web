import React, {FC, memo} from 'react';
import {type IFile} from "@/entities/fileSystem";
import FileSystemFile from "@/components/FileSystem/File/FileSystemFile";
import {useSelectFileSystemItems} from "@/hooks/selectFileSystemItems";
import {useAppDispatch} from "@/hooks";
import {fileSystemActions} from "@/store/slices/fileSystemSlice/fileSystemSlice";
import classes from "./FileList.module.scss";
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
                                                               dispatch(fileSystemActions.openPreviewModalWindow({fileExtension: file.name.substring(file.name.lastIndexOf('.')) as 'txt'|'sql'|'csv'|'xlsx', fileId: file.id}));
                                                           }}
                                                           index={index}/>)
    );
};

export default memo(FilesList);