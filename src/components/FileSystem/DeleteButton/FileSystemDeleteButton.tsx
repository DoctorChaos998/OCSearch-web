'use client'
import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/hooks";
import {fileSystemActions} from "@/store/slices/fileSystemSlice/fileSystemSlice";
import {CSSTransition} from "react-transition-group";
import {useParams} from "next/navigation";
import classes from "./FileSystemDeleteButton.module.scss";

const FileSystemDeleteButton = () => {
    const dispatch = useAppDispatch();
    const selectedFileSystemItemIds = useAppSelector(state => state.fileSystemReducer.selectedFileSystemItemIds);
    const [isActive, setIsActive] = useState(false);
    const params = useParams<{folderId: string}>();
    const ref = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        if(selectedFileSystemItemIds.length>0) setIsActive(true);
        else setIsActive(false);
    }, [selectedFileSystemItemIds]);
    const onDeleteButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        dispatch(fileSystemActions.openDeleteModalWindow(params.folderId?'file':'folder'));
    }
    return (
        <CSSTransition in={isActive} nodeRef={ref} timeout={{
            enter:300,
            exit:500
        }} classNames={{
            enterDone:  classes.buttonShow,
        }}>
            <button onClick={onDeleteButtonClick} className={classes.deleteButton} ref={ref}>
                <span className="material-icons">
                    delete
                </span>
            </button>
        </CSSTransition>
    );
};

export default FileSystemDeleteButton;