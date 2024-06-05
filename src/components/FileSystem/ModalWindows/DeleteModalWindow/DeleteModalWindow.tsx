'use client'
import React from 'react';
import ModalWindow from "@/ui/modals/ModalWindow/ModalWindow";
import {createPortal} from "react-dom";
import {fileSystemActions} from "@/lib/features/fileSystemSlice/fileSystemSlice";
import classes from "./DeleteModalWindow.module.scss";
import {deleteFiles, deleteFolders} from "@/lib/features/fileSystemSlice/fileSystemActions";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";

const DeleteModalWindow = () => {
    const dispatch = useAppDispatch();
    const selectedFileSystemItemIds = useAppSelector(state => state.fileSystemReducer.selectedFileSystemItemIds);
    const itemDeletionPopup = useAppSelector(state => state.fileSystemReducer.itemDeletionPopup);
    const onFormSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        itemDeletionPopup.deleteItem === 'file'?dispatch(deleteFiles(selectedFileSystemItemIds)):dispatch(deleteFolders(selectedFileSystemItemIds));
        dispatch(fileSystemActions.closeItemDeletionPopup());
    }

    return (
        <ModalWindow onModalWindowClickHandler={() => dispatch(fileSystemActions.closeItemDeletionPopup())}>
            <div className={classes.container} onClick={(event: React.MouseEvent<HTMLDivElement>) => {event.stopPropagation()}}>
                <form className={classes.form} onSubmit={onFormSubmitHandler}>
                    <h2 className={classes.header}>
                        {
                            selectedFileSystemItemIds.length === 1
                                ?
                                `Do you really want to delete this ${itemDeletionPopup.deleteItem === 'file'?"file":"folder"}?`
                                :
                                `Do you really want to delete these ${selectedFileSystemItemIds.length} ${itemDeletionPopup.deleteItem === 'file'?"files":"folders"}?`
                        }
                    </h2>
                    <div className={classes.buttonsContainer}>
                        <button type={'button'} onClick={() => dispatch(fileSystemActions.closeItemDeletionPopup())} className={classes.cancelButton}>
                            Cancel
                        </button>
                        <button type={'submit'} className={classes.acceptButton}>
                            Accept
                        </button>
                    </div>
                </form>
            </div>
        </ModalWindow>
    );
};

export default DeleteModalWindow;