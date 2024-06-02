'use client'
import React from 'react';
import type {keyForSelect} from "@/types/fileSystem";
import {useFileSystemItemTooltip} from "@/hooks/FileSystem/itemTooltip";
import {CSSTransition} from "react-transition-group";
import {useAppSelector} from "@/lib/hooks";
import {fileStatusDisplayName} from "@/entities/fileSystem";
import {fileSizeToString} from "@/helpers/fileSystemHelper";
import {useFileSystemItemSelect} from "@/hooks/FileSystem/itemSelect";
import classes from "./FileSystemItem.module.scss";
import {clsx} from "clsx";
import {shallowEqual} from "react-redux";

interface IFileSystemItem{
    id: number
    onClickHandler: (keyForSelect: keyForSelect, folderId: number, folderIndex: number) => void,
    onDoubleClickHandler: () => void,
    index: number
}
const FileSystemItem = ({id, onClickHandler, onDoubleClickHandler, index}: IFileSystemItem) => {
    const attributes = useAppSelector(state => state.fileSystemReducer.fileSystemItems.find(item => item.id === id), {equalityFn: shallowEqual})!;
    const {tooltipIsVisible, computeTooltipPosition, tooltipPosition, hideTooltip, mouseEnterHandler, tooltipRef} = useFileSystemItemTooltip();
    const {touchStartHandler, touchEndHandler, touchMoveHandler} = useFileSystemItemSelect(() => onClickHandler(null, attributes.id, index), onDoubleClickHandler);

    return (
        <div onDoubleClick={onDoubleClickHandler}
             className={clsx(classes.fileSystemItemContainer, attributes.isSelected && classes.fileSystemItemContainerActive)}
             onClick={(event) => {
                 event.stopPropagation();
                 if (window.innerWidth > 767) {
                     const keyForSelect: keyForSelect = event.shiftKey ? 'shift' : event.ctrlKey ? 'ctrl' : null;
                     onClickHandler(keyForSelect, attributes.id, index);
                 }
             }}
             onTouchStart={touchStartHandler}
             onTouchMove={touchMoveHandler}
             onTouchEnd={touchEndHandler}
             onMouseEnter={mouseEnterHandler}
             onMouseLeave={hideTooltip}>
                <span className={clsx('material-icons',  'filesNumber' in attributes?classes.fileSystemFolderIcon:classes.fileSystemFileIcon)}>
                    {'filesNumber' in attributes?'folder':'contact_page'}
                </span>
            <p className={classes.fileSystemItemName}>{attributes.name}</p>
            <CSSTransition nodeRef={tooltipRef}
                           onEnter={computeTooltipPosition}
                           in={tooltipIsVisible}
                           timeout={{
                               enter: 1000,
                               exit: 300
                           }} classNames={{
                enterDone: classes.fileSystemItemTooltipContainerActive
            }} unmountOnExit={true}>
                <span className={classes.fileSystemItemTooltipContainer} style={{...tooltipPosition}} ref={tooltipRef}>
                    {`Name: ${attributes.name}`}
                    <br/>
                    {'filesNumber' in attributes?
                        <>
                            {`Created by: ${attributes.createdBy}`}
                            <br/>
                            {`Upload date: ${attributes.lastUploadDate ?? 'Undefined'}`}
                            <br/>
                            {`Files number: ${attributes.filesNumber}`}
                        </>
                        :
                        <>
                            {`Uploaded by: ${attributes.uploadedBy}`}
                            <br/>
                            {`Upload date: ${attributes.uploadDate ?? 'Undefined'}`}
                            <br/>
                            {`Size: ${fileSizeToString(attributes.size)}`}
                            <br/>
                            {`Status: ${fileStatusDisplayName[attributes.status]}`}
                        </>
                    }
                </span>
            </CSSTransition>
        </div>
    );
};

export default FileSystemItem;