'use client'
import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import classes from "./FileCatalogSorter.module.css";
import {
    allSortMethod,
    fileCatalogSortingMethodForFile,
    fileCatalogSortingMethodForFolder, filesSortMethod, foldersSortMethod,
} from "@/entites/files/fileCatalogItem";
import {fileSystemSlice} from "@/app/(content)/files/Store/FileSystem/FileSystemSlise";
import {CSSTransition} from "react-transition-group";

const FileCatalogSorter: FC = () => {
    const [isSorterOpen, setIsSorterOpen] = useState<boolean>(false)
    const {sortingMethod, currentFolderId, sortingType} = useAppSelector(state => state.fileSystemReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const handler = (event: MouseEvent) => {
            setIsSorterOpen(false)
        }
        window.addEventListener('click', handler, false)
        return () => {
            window.removeEventListener('click', handler, false)
        }
    })
    const onClickDropDownButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setIsSorterOpen(!isSorterOpen)
    }
    const onClickDropDownValue = (event: React.MouseEvent<HTMLDivElement>, sortType: fileCatalogSortingMethodForFile|fileCatalogSortingMethodForFolder) => {
        event.stopPropagation()
        dispatch(fileSystemSlice.actions.setSortingMethod(sortType))
        setIsSorterOpen(false)
    }
    const onAscendingClick = (event: React.MouseEvent<HTMLDivElement>) => {
        dispatch(fileSystemSlice.actions.setSortingType('byAscending'))
        setIsSorterOpen(false)
    }
    const onDescendingClick = (event: React.MouseEvent<HTMLDivElement>) => {
        dispatch(fileSystemSlice.actions.setSortingType('byDescending'))
        setIsSorterOpen(false)
    }
    return (
        <div className={classes.dropDownContainer}>
            <button className={classes.sorterButtonContainer} onClick={onClickDropDownButton}>
                <span className="material-icons" style={{rotate: sortingType==='byDescending'?'0deg':'180deg'}}>
                    sort
                </span>
                {` По ${allSortMethod[sortingMethod]}`}
            </button>
            <CSSTransition in={isSorterOpen} timeout={100} classNames={{
                enterDone: classes.dropDownContentOpen
            }} unmountOnExit={true}>
                <div className={classes.dropDownContent}>
                    {Boolean(currentFolderId)?
                        filesSortMethod.map((value) =>
                            <div key={value.sortMethod} onClick={(event) => onClickDropDownValue(event, value.sortMethod)} className={classes.dropDownItem}>
                                {`По ${value.sortName}`}
                            </div>)
                        :
                        foldersSortMethod.map((value) =>
                            <div key={value.sortMethod} onClick={(event) => onClickDropDownValue(event, value.sortMethod)} className={classes.dropDownItem}>
                                {`По ${value.sortName}`}
                            </div>)}
                    <hr className={classes.dropDownHr}/>
                    <div className={classes.dropDownItem} onClick={onDescendingClick}>
                        Descending
                        {(sortingType === 'byDescending')&&
                            <span className="material-icons">
                                check
                            </span>}
                    </div>
                    <div className={classes.dropDownItem} onClick={onAscendingClick}>
                        Ascending
                        {(sortingType === 'byAscending')&&
                            <span className="material-icons">
                                check
                            </span>}
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default FileCatalogSorter;