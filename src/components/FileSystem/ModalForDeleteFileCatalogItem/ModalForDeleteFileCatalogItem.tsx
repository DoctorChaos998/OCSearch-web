import React from 'react';
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import ModalWindow from "@/ui/modals/ModalWindow/ModalWindow";
import {fileSystemSlice} from "@/app/(content)/files/Store/FileSystem/FileSystemSlise";
import classes from "./ModalForDeleteFileCatalogItem.module.css";
import {deleteFiles, deleteFolders} from "@/app/(content)/files/Store/FileSystem/FileSystemActions";

const ModalForDeleteFileCatalogItem = () => {
    const dispatch = useAppDispatch();
    const {currentFolderId,selectedFileSystemObjectIds} = useAppSelector(state => state.fileSystemReducer)
    const onCloseModalWindowHandler = (event: React.MouseEvent<HTMLDivElement>|React.MouseEvent<HTMLButtonElement>) => {
        dispatch(fileSystemSlice.actions.setModalForDeleteItemIsVisible(false))
    }
    const onAcceptButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(currentFolderId){
            dispatch(deleteFiles(selectedFileSystemObjectIds)).then()
        }
        else {
            dispatch(deleteFolders(selectedFileSystemObjectIds)).then()
        }
    }
    return (
        <ModalWindow onModalWindowClickHandler={onCloseModalWindowHandler}>
            <div className={classes.modalContainer} onClick={(event: React.MouseEvent<HTMLDivElement>) => {event.stopPropagation()}}>
                <span className={classes.modalSpan}>
                    {`Are you sure in delete this ${selectedFileSystemObjectIds.length} ${ currentFolderId?"files":"folders"}?`}
                </span>
                <div className={classes.modalButtonContainer}>
                    <button onClick={onCloseModalWindowHandler} className={classes.modalCanselButton}>
                        Cansel
                    </button>
                    <button className={classes.modalAcceptButton} onClick={onAcceptButtonClickHandler}>
                        Accept
                    </button>
                </div>
            </div>
        </ModalWindow>
    );
};

export default ModalForDeleteFileCatalogItem;