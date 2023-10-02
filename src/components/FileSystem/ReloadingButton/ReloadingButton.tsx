'use client'
import React from 'react';
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import classes from "./ReloadingButton.module.css";
import {loadingFilesList, loadingFolderList} from "@/app/(content)/files/Store/FileSystem/FileSystemActions";
import {CSSTransition} from "react-transition-group";

const ReloadingButton = () => {
    const dispatch = useAppDispatch();
    const {currentFolderId, loadingFiles} = useAppSelector(state => state.fileSystemReducer);
    const onReloadingButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(currentFolderId){
            dispatch(loadingFilesList(currentFolderId)).then();
        }
        else {
            dispatch(loadingFolderList()).then();
        }
    }
    return (
        <CSSTransition in={!loadingFiles} timeout={{
            enter:300,
            exit:500
        }} classNames={{
            enterDone: classes.buttonShow
        }} unmountOnExit={true}>
            <button onClick={onReloadingButtonClick} className={classes.reloadingButton}>
                <span className="material-icons">
                    refresh
                </span>
            </button>
        </CSSTransition>
    );
};

export default ReloadingButton;