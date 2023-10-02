import React, {FC, useState} from 'react';
import SelectFolderNameModalButton from "@/ui/buttons/SelectFolderNameModalButton/SelectFolderNameModalButton";
import classes from "./ModalForFileCatalogItemNaming.module.css";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {notificationSlice} from "@/components/Notification/store/NotificationSlice";
import ModalWindow from "@/ui/modals/ModalWindow/ModalWindow";
import {fileSystemSlice} from "@/app/(content)/files/Store/FileSystem/FileSystemSlise";
import {renameFile, renameFolder, uploadsFile} from "@/app/(content)/files/Store/FileSystem/FileSystemActions";
import fileCatalog from "@/components/FileSystem/FileCatalog/FileCatalog";

interface IModalForFileCatalogItemNamingProps{
    fileList?: FileList|null
}
const ModalForFileCatalogItemNaming: FC<IModalForFileCatalogItemNamingProps> = ({fileList}) => {
    const dispatch = useAppDispatch()
    const {modalForFileCatalogItemNamingError, fileCatalogItemNamingType, initialNameForRename, selectedFileSystemObjectIds} = useAppSelector(state => state.fileSystemReducer)
    const [newFileCatalogItemName, setNewFileCatalogItemName] = useState(initialNameForRename)
    const closeModalHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        dispatch(fileSystemSlice.actions.closeModalWindowForFileCatalogItemNaming())
    }
    const submitFormHandler = (event: React.FormEvent) => {
        event.preventDefault()
        //console.log(modalForFileCatalogItemNamingError, fileCatalogItemNamingType, newFileCatalogItemName)
        console.log(fileCatalogItemNamingType)
        switch (fileCatalogItemNamingType){
            case 'createFolder':{
                if(fileList !== null && fileList !== undefined)
                    dispatch(uploadsFile(newFileCatalogItemName,fileList)).then();
                break;
            }
            case 'renameFolder':{
                dispatch(renameFolder(selectedFileSystemObjectIds[0], newFileCatalogItemName)).then()
                break;
            }
            case 'renameFile':{
                dispatch(renameFile(selectedFileSystemObjectIds[0], newFileCatalogItemName)).then()
                break;
            }
        }
    }

    return (
        <ModalWindow onModalWindowClickHandler={closeModalHandler}>
            <div className={classes.modalContainer} onClick={(event: React.MouseEvent<HTMLDivElement>) => {event.stopPropagation()}}>
                <form className={classes.modalForm}>
                    <div className={!modalForFileCatalogItemNamingError?classes.inputBox: classes.inputBoxError}>
                        <input value={newFileCatalogItemName} onChange={(event) => setNewFileCatalogItemName(event.target.value)} className={classes.modalInput} placeholder="File Name" autoFocus={true} onFocus={(event: React.FocusEvent<HTMLInputElement>) => {event.target.select()}}/>
                    </div>
                    <SelectFolderNameModalButton onClick={submitFormHandler}>Ok</SelectFolderNameModalButton>
                </form>
            </div>
        </ModalWindow>
    );
};

export default ModalForFileCatalogItemNaming;