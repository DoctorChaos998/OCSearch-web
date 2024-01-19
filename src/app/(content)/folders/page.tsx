'use client'
import React, {useLayoutEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from "@/hooks";
import {loadingFolderList} from "@/store/slices/fileSystemSlice/fileSystemActions";
import {fileSystemActions} from "@/store/slices/fileSystemSlice/fileSystemSlice";
import FoldersList from "@/components/FileSystem/FoldersList/FoldersList";
import {IFolder} from "@/entities/fileSystem";
import classes from './folders.module.scss'
import FileSystemLoader from "@/components/FileSystem/FileSystemLoader/FileSystemLoader";

const FoldersPage = () => {
    const dispatch = useAppDispatch();
    const {fileSystemItems, status, sorter, searchQuery} = useAppSelector(state => state.fileSystemReducer);
    useLayoutEffect(() => {
        dispatch(fileSystemActions.resetFilters());
        dispatch(loadingFolderList());
    }, []);
    const selectAllFoldersHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        if(event.ctrlKey && event.code === 'KeyA'){
            dispatch(fileSystemActions.selectAllItems('folders'));
        }
    }
    const sortingFolders = (firstFolderItem: IFolder, secondFolderItem: IFolder): number => {
        switch (sorter.target){
            case 'name':
                return sorter.order === 'byAscending'?firstFolderItem.name.localeCompare(secondFolderItem.name):-firstFolderItem.name.localeCompare(secondFolderItem.name);
            case 'filesNumber':
                if(firstFolderItem.filesNumber > secondFolderItem.filesNumber) return sorter.order === 'byAscending'?1:-1;
                if(firstFolderItem.filesNumber < secondFolderItem.filesNumber) return sorter.order === 'byAscending'?-1:1;
                return 0;
            case 'uploadDate':
                if(firstFolderItem.lastUploadDate === null) return sorter.order === 'byAscending'?1:-1;
                if(secondFolderItem.lastUploadDate === null) return sorter.order === 'byAscending'?-1:1;
                return sorter.order === 'byAscending'?firstFolderItem.lastUploadDate.localeCompare(secondFolderItem.lastUploadDate):-firstFolderItem.lastUploadDate.localeCompare(secondFolderItem.lastUploadDate);
            default: return 0;
        }
    }
    const sortedFolders: IFolder[] = useMemo(() => {
        return [...fileSystemItems.folders].sort((a, b) => sortingFolders(a,b));
    },[sorter.order, sorter.target, fileSystemItems])

    const sortedAndFilteredFolders: IFolder[] = useMemo(() => {
        return sortedFolders.filter((value) => value.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [sortedFolders, searchQuery])
    return (
        (status==='loading'||status==='initial')?
            <FileSystemLoader/>:
            <div onKeyDown={selectAllFoldersHandler} tabIndex={1} className={classes.foldersContainer} onClick={() => dispatch(fileSystemActions.deselectAllItems())}>
                <FoldersList folderList={sortedAndFilteredFolders}></FoldersList>
            </div>
    );
};

export default FoldersPage;