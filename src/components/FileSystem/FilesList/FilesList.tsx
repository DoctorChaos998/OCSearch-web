import React, {FC, memo} from 'react';
import {type IFile} from "@/entities/fileSystem";
import FileSystemFile from "@/components/FileSystem/File/FileSystemFile";
import {useSelectFileSystemItems} from "@/hooks/selectFileSystemItems";

interface IFileListProps{
    fileList: IFile[]
}
const FilesList: FC<IFileListProps> = ({fileList}) => {
    const onFileClickHandler = useSelectFileSystemItems(fileList);
    return (
        fileList.length===0?
            <h1>
                Files not exist
            </h1>
            :
            fileList.map((file, index) => <FileSystemFile key={file.id} file={file}
                                                           onClickHandler={onFileClickHandler}
                                                           onDoubleClickHandler={() => {}}
                                                           index={index}/>)
    );
};

export default memo(FilesList);