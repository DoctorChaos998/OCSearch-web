'use client'
import React from 'react';
import classes from "./ItemInfoModalWindow.module.scss";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {createPortal} from "react-dom";
import ModalWindow from "@/ui/modals/ModalWindow/ModalWindow";
import {fileSystemActions} from "@/store/slices/fileSystemSlice/fileSystemSlice";
import {fileStatusDisplayName} from "@/entities/fileSystem";
import {fileSizeToString} from "@/helpers/fileSystemHelper";

const ItemInfoModalWindow = () => {
    const {item, isVisible, itemType} = useAppSelector(state => state.fileSystemReducer.itemInfoModalWindow);
    const dispatch = useAppDispatch();
    return (
        isVisible && createPortal(
            <ModalWindow onModalWindowClickHandler={() => dispatch(fileSystemActions.closeItemInfoModalWindow())}>
                <div className={classes.container} onClick={(event) => event.stopPropagation()}>
                    <h2 className={classes.header}>{itemType === 'folder'?"Folder":"File"} info</h2>
                    <span>Name: {item?.name}</span>
                    {'size' in item!?
                        <>
                            <span>Upload date: {item.uploadDate}</span>
                            <span>Uploaded by: {item.uploadedBy}</span>
                            <span>Status: {fileStatusDisplayName[item.status]}</span>
                            <span>Size: {fileSizeToString(item.size)}</span>
                        </>
                        :
                        <>
                            <span>Upload date: {item!.lastUploadDate}</span>
                            <span>Created by: {item!.createdBy}</span>
                            <span>Files number: {item!.filesNumber}</span>
                        </>
                    }
                </div>
            </ModalWindow>, document.getElementById('modalsContainer')!)

    );
};

export default ItemInfoModalWindow;