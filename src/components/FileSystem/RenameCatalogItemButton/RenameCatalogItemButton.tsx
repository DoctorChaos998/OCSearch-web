import React from 'react';
import {CSSTransition} from "react-transition-group";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import classes from "./RenameCatalogItemButton.module.css"
import {fileSystemSlice} from "@/app/(content)/files/Store/FileSystem/FileSystemSlise";

const RenameCatalogItemButton = () => {
    const dispatch = useAppDispatch();
    const {currentFolderId, selectedFileSystemObjectIds, fileList, folderList} = useAppSelector(state => state.fileSystemReducer)

    const onRenameButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if(currentFolderId){
            const initialName = fileList.find((value) => value.id === selectedFileSystemObjectIds[0])?.name
            dispatch(fileSystemSlice.actions.openModalWindowForFileCatalogItemNaming({fileCatalogItemNamingType: 'renameFile', initialName: initialName?initialName:''}))
        }
        else
        {
            const initialName = folderList.find((value) => value.id === selectedFileSystemObjectIds[0])?.name
            dispatch(fileSystemSlice.actions.openModalWindowForFileCatalogItemNaming({fileCatalogItemNamingType: 'renameFolder', initialName: initialName?initialName:''}))
        }
    }

    return (
        <CSSTransition in={Boolean(selectedFileSystemObjectIds.length === 1)} timeout={{
            enter:300,
            exit:500
        }} classNames={{
            enterDone: classes.buttonShow
        }} unmountOnExit={true}>
            <button className={classes.renameButton} onClick={onRenameButtonClick}>
                <span className="material-icons">
                    drive_file_rename_outline
                </span>
            </button>
        </CSSTransition>
    );
};

export default RenameCatalogItemButton;