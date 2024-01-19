'use client'
import React, {useEffect, useRef} from 'react';
import classes from "./MobileHelper.module.scss";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {CSSTransition} from "react-transition-group";
import {fileSystemActions} from "@/store/slices/fileSystemSlice/fileSystemSlice";
import {useParams} from "next/navigation";

const MobileHelper = () => {
    const isActive = useAppSelector(state => state.fileSystemReducer.mobileHelper.isActive);
    const ref = useRef<HTMLDivElement>(null);
    const selectedFileSystemItemIds = useAppSelector(state => state.fileSystemReducer.selectedFileSystemItemIds);
    const dispatch = useAppDispatch();
    const params = useParams<{folderId: string}>();
    useEffect(() => {
        if(selectedFileSystemItemIds.length === 0 && isActive){
            dispatch(fileSystemActions.deselectAllItems());
        }
    }, [selectedFileSystemItemIds]);
    return (
        <CSSTransition nodeRef={ref} in={isActive} timeout={{
            enter:500,
            exit:300
        }} classNames={{
            enterDone: classes.containerShow
        }} unmountOnExit={true}>
            <div className={classes.container} ref={ref} onClick={(event) => {event.stopPropagation()}}>
                <span className={classes.selectedItemsNumber}>{`Items number: ${selectedFileSystemItemIds.length}`}</span>
                <div className={classes.rightContainer}>
                    {selectedFileSystemItemIds.length === 1 &&
                        <button className={classes.button} onClick={(event) => {
                            event.stopPropagation();
                            dispatch(fileSystemActions.openRenameModalWindow({itemType: params.folderId?'file':'folder', itemId: selectedFileSystemItemIds[0]}));
                        }}>
                            <span className={`material-icons ${classes.icon}`}>
                                drive_file_rename_outline
                            </span>
                        </button>
                    }
                    <button className={classes.button} onClick={(event) => {
                        event.stopPropagation();
                        dispatch(fileSystemActions.openDeleteModalWindow(params.folderId?'file':'folder'));
                    }}>
                        <span className={`material-icons ${classes.icon}`}>
                            delete
                        </span>
                    </button>
                </div>
            </div>
        </CSSTransition>
    );
};

export default MobileHelper;