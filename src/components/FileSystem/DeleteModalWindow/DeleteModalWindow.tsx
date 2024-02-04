'use client'
import React from 'react';
import {useAppDispatch, useAppSelector} from "@/hooks";
import ModalWindow from "@/ui/modals/ModalWindow/ModalWindow";
import {createPortal} from "react-dom";
import {fileSystemActions} from "@/store/slices/fileSystemSlice/fileSystemSlice";
import classes from "./DeleteModalWindow.module.scss";
import {deleteFiles, deleteFolders} from "@/store/slices/fileSystemSlice/fileSystemActions";

const DeleteModalWindow = () => {
    const dispatch = useAppDispatch();
    const selectedFileSystemItemIds = useAppSelector(state => state.fileSystemReducer.selectedFileSystemItemIds);
    const deleteModalWindow = useAppSelector(state => state.fileSystemReducer.deleteModalWindow);
    const onFormSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        deleteModalWindow.deleteItem === 'file'?dispatch(deleteFiles(selectedFileSystemItemIds)):dispatch(deleteFolders(selectedFileSystemItemIds));
        dispatch(fileSystemActions.closeDeleteModalWindow());
    }

    return (
        deleteModalWindow.isVisible?
            createPortal(
                <ModalWindow onModalWindowClickHandler={() => dispatch(fileSystemActions.closeDeleteModalWindow())}>
                    <div className={classes.container} onClick={(event: React.MouseEvent<HTMLDivElement>) => {event.stopPropagation()}}>
                        <form className={classes.form} onSubmit={onFormSubmitHandler}>
                            <h2 className={classes.header}>
                                {`Do you really want to erase these ${selectedFileSystemItemIds.length} ${deleteModalWindow.deleteItem === 'file'?"files":"folders"}?`}
                            </h2>
                            <div className={classes.buttonsContainer}>
                                <button  type={'button'} onClick={() => dispatch(fileSystemActions.closeDeleteModalWindow())} className={classes.cancelButton}>
                                    Cancel
                                </button>
                                <button type={'submit'} className={classes.acceptButton}>
                                    Accept
                                </button>
                            </div>
                        </form>
                    </div>
                </ModalWindow>, document.getElementById('modalsContainer')!):null
    );
};

export default DeleteModalWindow;