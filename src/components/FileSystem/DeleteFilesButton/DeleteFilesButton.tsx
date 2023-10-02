import React from 'react';
import classes from "./DeleteFilesButton.module.css";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {deleteFolders} from "@/app/(content)/files/Store/FileSystem/FileSystemActions";
import {fileSystemSlice} from "@/app/(content)/files/Store/FileSystem/FileSystemSlise";
import {CSSTransition} from "react-transition-group";

const DeleteFilesButton = () => {
    const dispatch = useAppDispatch();
    const {selectedFileSystemObjectIds} = useAppSelector(state => state.fileSystemReducer)
    const onDeleteButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        dispatch(fileSystemSlice.actions.setModalForDeleteItemIsVisible(true))
        //dispatch(deleteFolders(selectedFileSystemObjectIds)).then()
    }
    return (
        <CSSTransition in={Boolean(selectedFileSystemObjectIds.length>0)} unmountOnExit={true} timeout={{
            enter:300,
            exit:500
        }} classNames={{
            enterDone:  classes.buttonShow,
            }}>
            <button onClick={onDeleteButtonClick} className={classes.deleteButton}>
                <span className="material-icons">
                    delete
                </span>
            </button>
        </CSSTransition>
    );
};

export default DeleteFilesButton;