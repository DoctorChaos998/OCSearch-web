import React, {FC} from 'react';
import {IFolder} from "@/entities/fileSystem";
import FileSystemFolder from "@/components/FileSystem/Folder/FileSystemFolder";
import {useSelectFileSystemItems} from "@/hooks/selectFileSystemItems";
import {useRouter} from "next/navigation";
import classes from "./FoldersList.module.scss";

interface IFoldersList{
    folderList: IFolder[]
}
const FoldersList: FC<IFoldersList> = ({folderList}) => {
    const router = useRouter();
    const onFolderClickHandler = useSelectFileSystemItems(folderList);
    return (
        folderList.length===0?
            <h1 className={classes.header}>
                Folders not exist
            </h1>
            :
            folderList.map((folder, index) => <FileSystemFolder key={folder.id}
                                                                 folder={folder}
                                                                 onClickHandler={onFolderClickHandler}
                                                                 onDoubleClickHandler={() => router.push(`/folders/${folder.id}`)}
                                                                 index={index}/>)
    );
};

export default FoldersList;