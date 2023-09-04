import React, {useState} from 'react';
import classes from "./FileCatalog.module.css";
import FolderCard from "@/ui/cards/FolderCard/FolderCard";
import {IFileOrFolder} from "@/entites/files/filesAndFolders";
const FileCatalog = () => {
    const [currentFoldersOrFile, setCurrentFoldersOrFile] = useState<IFileOrFolder[]>([
        {id: "1", name: "Folder name 1", path: "/folder_1", type: "folder", isActive: false},
        {id: "2", name: "Folder name 2", path: "/folder_2", type: "folder", isActive: false},
        {id: "3", name: "Folder name 3", path: "/folder_3", type: "folder", isActive: false},
        {id: "4", name: "Folder name 4", path: "/folder_4", type: "folder", isActive: false},
        {id: "5", name: "Folder name 5", path: "/folder_5", type: "folder", isActive: false},
        {id: "6", name: "Folder name 6", path: "/folder_6", type: "folder", isActive: false},
        {id: "7", name: "Folder name 7", path: "/folder_7", type: "folder", isActive: false},
        {id: "8", name: "Folder name 8", path: "/folder_8", type: "folder", isActive: false},
        {id: "9", name: "Folder name 9", path: "/folder_9", type: "folder", isActive: false},
        {id: "10", name: "Folder name 10", path: "/folder_10", type: "folder", isActive: false},
    ])
    const [currentDirectoryPath, setCurrentDirectoryPath] = useState<string>('')

    const doubleClickHandler = (event: React.MouseEvent<HTMLDivElement>, id: string, path?: string) => {
        console.log(path)
    }
    const clickHandler = (event: React.MouseEvent<HTMLDivElement>, id: string) => {
        if(event.ctrlKey){
        } else {
        }
    }
    return (
        <div className={classes.fileCatalogContainer}>
            <div className={classes.fileCatalogHelper}>
                <button className={classes.fileCatalogExitButton}>
                    <span className="material-icons">
                        chevron_left
                    </span>
                </button>
                <div>

                </div>
            </div>
            <div className={classes.fileCatalog}>
                {currentDirectoryPath === ''?
                    currentFoldersOrFile.map((folder) =>
                        <FolderCard onDoubleClick={doubleClickHandler} entity={folder} onClick={clickHandler} ></FolderCard>
                    )
                    :null
                }
                {/*{folders.map(value => <FolderCard onDoubleClick={doubleClickHandler} folderName={value.folderName} path={value.path} onClick={clickHandler} isActive={value.active}></FolderCard>)}*/}
            </div>
        </div>
    );
};

export default FileCatalog;