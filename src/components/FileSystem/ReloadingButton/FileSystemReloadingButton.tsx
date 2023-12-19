'use client'
import React, {useEffect, useRef, useState} from 'react';
import classes from "./FileSystemReloadingButton.module.scss";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {loadingFileList, loadingFolderList} from "@/store/slices/fileSystemSlice/fileSystemActions";
import {CSSTransition} from "react-transition-group";
import {useParams} from "next/navigation";


const FileSystemReloadingButton = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.fileSystemReducer.status);
    const [isActive, setIsActive] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);
    const params = useParams<{folderId: string}>();
    useEffect(() => {
        setIsActive(status === 'success');
    }, [status]);
    const onReloadingButtonClick = () => {
        params.folderId?dispatch(loadingFileList(+params.folderId)).then():dispatch(loadingFolderList()).then();
    }
    return (
        <CSSTransition in={isActive} nodeRef={ref} timeout={{
            enter:300,
            exit:500
        }} classNames={{
            enterDone: classes.buttonShow
        }} unmountOnExit={true}>
            <button onClick={onReloadingButtonClick} ref={ref} className={classes.reloadingButton}>
                <span className="material-icons">
                    refresh
                </span>
            </button>
        </CSSTransition>
    );
};

export default FileSystemReloadingButton;