'use client'
import React, {useEffect, useRef, useState} from 'react';
import {fileSystemActions} from "@/lib/features/fileSystemSlice/fileSystemSlice";
import {CSSTransition} from "react-transition-group";
import {useParams} from "next/navigation";
import classes from "./FileSystemDeleteButton.module.scss";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";

const FileSystemDeleteButton = () => {
    const dispatch = useAppDispatch();
    const selectedFileSystemItemIds = useAppSelector(state => state.fileSystemReducer.selectedFileSystemItemIds);
    const [isActive, setIsActive] = useState(false);
    const params = useParams<{folderId: string}>();
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setIsActive(selectedFileSystemItemIds.length>0)
    }, [selectedFileSystemItemIds]);

    const onDeleteButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        dispatch(fileSystemActions.openItemDeletionPopup(params.folderId?'file':'folder'));
    }
    return (
        <CSSTransition in={isActive} nodeRef={ref} timeout={{
            enter:300,
            exit:500
        }} classNames={{
            enterDone:  classes.buttonShow,
        }} unmountOnExit={true}>
            <button onClick={onDeleteButtonClick} className={classes.deleteButton} ref={ref}>
                <span className="material-icons">
                    delete
                </span>
            </button>
        </CSSTransition>
    );
};

export default FileSystemDeleteButton;