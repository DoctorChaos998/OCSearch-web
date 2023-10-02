import React from 'react';
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {fileSystemSlice} from "@/app/(content)/files/Store/FileSystem/FileSystemSlise";
import classes from "./GoOutFromFolder.module.css";
import {CSSTransition} from "react-transition-group";
import {boolean} from "zod";

const GoOutFromFolder = () => {
    const dispatch = useAppDispatch()
    const {currentFolderId} = useAppSelector(state => state.fileSystemReducer)
    const onExitButtonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(fileSystemSlice.actions.setCurrentFolder(0))
        dispatch(fileSystemSlice.actions.dropSelectedFiles())
    }
    return (
        <CSSTransition in={Boolean(currentFolderId)} timeout={{
            enter:300,
            exit:500
        }} classNames={{
            enterDone: classes.buttonShow
        }} unmountOnExit={true}>
            <button onClick={onExitButtonHandler} className={classes.goOutFromFolderButton}>
                <span className="material-icons">
                    arrow_back
                </span>
            </button>
        </CSSTransition>
    );
};

export default GoOutFromFolder;