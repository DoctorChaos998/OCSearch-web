'use client'
import React, {useEffect, useRef, useState} from 'react';
import classes from "./FileSystemSorter.module.scss";
import {CSSTransition} from "react-transition-group";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {
    allSorterTarget, fileSorterTargets,
    type fileSystemSortingOrder,
    type fileSystemSortingTarget, folderSorterMethods
} from "@/entities/fileSystem";
import {fileSystemActions} from "@/store/slices/fileSystemSlice/fileSystemSlice";
import {useParams} from "next/navigation";

const FileSystemSorter = () => {
    const [sorterIsOpen, setSorterIsOpen] = useState<boolean>(false);
    const sorter = useAppSelector(state => state.fileSystemReducer.sorter);
    const ref = useRef(null);
    const dispatch = useAppDispatch();
    const params = useParams<{folderId: string}>();

    useEffect(() => {
        const handler = () => {
            setSorterIsOpen(false)
        }
        window.addEventListener('click', handler, false);
        return () => {
            window.removeEventListener('click', handler, false);
        }
    })
    const onClickDropDownButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setSorterIsOpen((prevState) => !prevState);
    }
    const onSorterItemTargetHandler = (target: fileSystemSortingTarget) => {
        dispatch(fileSystemActions.setSorterTarget(target));
    }
    const onSorterOrderClickHandler = (order: fileSystemSortingOrder) => {
        dispatch(fileSystemActions.setSorterOrder(order));
    }
    return (
        <div className={classes.dropDownContainer}>
            <button className={classes.sorterButtonContainer} onClick={onClickDropDownButton}>
                <span className="material-icons" style={{rotate: sorter.order==='byDescending'?'0deg':'180deg', marginRight: 7}}>
                    sort
                </span>
                {allSorterTarget[sorter.target]}
            </button>
            <CSSTransition nodeRef={ref} in={sorterIsOpen} timeout={100} classNames={{
                enterDone: classes.dropDownContentOpen
            }} unmountOnExit={true}>
                <div className={classes.dropDownContent} ref={ref}>
                    {params.folderId?
                        fileSorterTargets.map((value) =>
                            <div key={value.sorterTarget} onClick={() => onSorterItemTargetHandler(value.sorterTarget)} className={classes.dropDownItem}>
                                {value.targetName}
                                {value.sorterTarget === sorter.target&&
                                    <span className={`material-icons ${classes.dropDownIcon}`}>
                                        check
                                    </span>}
                            </div>)
                        :
                        folderSorterMethods.map((value) =>
                            <div key={value.sorterTarget} onClick={() => onSorterItemTargetHandler(value.sorterTarget)} className={classes.dropDownItem}>
                                {value.targetName}
                                {value.sorterTarget === sorter.target&&
                                    <span className={`material-icons ${classes.dropDownIcon}`}>
                                        check
                                    </span>}
                            </div>)}
                    <hr className={classes.dropDownHr}/>
                    <div className={classes.dropDownItem} onClick={() => onSorterOrderClickHandler('byDescending')}>
                        Descending
                        {(sorter.order === 'byDescending')&&
                            <span className={`material-icons ${classes.dropDownIcon}`}>
                                check
                            </span>}
                    </div>
                    <div className={classes.dropDownItem} onClick={() => onSorterOrderClickHandler("byAscending")}>
                        Ascending
                        {(sorter.order === 'byAscending')&&
                            <span className={`material-icons ${classes.dropDownIcon}`}>
                                check
                            </span>}
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default FileSystemSorter;