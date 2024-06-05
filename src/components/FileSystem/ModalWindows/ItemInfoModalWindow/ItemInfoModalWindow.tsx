'use client'
import React from 'react';
import classes from "./ItemInfoModalWindow.module.scss";
import ModalWindow from "@/ui/modals/ModalWindow/ModalWindow";
import {fileSystemActions} from "@/lib/features/fileSystemSlice/fileSystemSlice";
import {fileStatusDisplayName} from "@/entities/fileSystem";
import {fileSizeToString} from "@/helpers/fileSystemHelper";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";

const ItemInfoModalWindow = () => {
    const {item, itemType} = useAppSelector(state => state.fileSystemReducer.itemInfoPopup);
    const dispatch = useAppDispatch();
    return (
        <ModalWindow onModalWindowClickHandler={() => dispatch(fileSystemActions.closeItemInfoPopup())}>
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
        </ModalWindow>
    );
};

export default ItemInfoModalWindow;