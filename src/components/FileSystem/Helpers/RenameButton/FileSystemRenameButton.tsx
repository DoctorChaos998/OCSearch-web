'use client'
import React, {useEffect, useRef, useState} from 'react';
import classes from "./FileSystemRenameButton.module.scss";
import {useParams} from "next/navigation";
import {fileSystemActions} from "@/lib/features/fileSystemSlice/fileSystemSlice";
import {CSSTransition} from "react-transition-group";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";

const FileSystemRenameButton = () => {
    const dispatch = useAppDispatch();
    const selectedFileSystemItemIds = useAppSelector(state => state.fileSystemReducer.selectedFileSystemItemIds);
    const [isActive, setIsActive] = useState(false);
    const params = useParams<{folderId: string}>();
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if(selectedFileSystemItemIds.length === 1) setIsActive(true);
        else setIsActive(false);
    }, [selectedFileSystemItemIds]);
    const onRenameButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        dispatch(fileSystemActions.openRenameModalWindow({itemType: params.folderId?'file':'folder', itemId: selectedFileSystemItemIds[0]}));
    }

    return (
        <CSSTransition nodeRef={ref} in={isActive} timeout={{
            enter:300,
            exit:500
        }} classNames={{
            enterDone: classes.buttonIsActive
        }} unmountOnExit={true}>
            <button className={classes.button} onClick={onRenameButtonClick} ref={ref}>
                <span className="material-icons">
                    drive_file_rename_outline
                </span>
            </button>
        </CSSTransition>
    );
};

export default FileSystemRenameButton;