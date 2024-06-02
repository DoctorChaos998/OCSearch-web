'use client'
import React, {useEffect} from 'react';
import {loadingFolderList} from "@/lib/features/fileSystemSlice/fileSystemActions";
import {fileSystemActions} from "@/lib/features/fileSystemSlice/fileSystemSlice";
import FileSystemLoader from "@/components/FileSystem/FileSystemLoader/FileSystemLoader";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import FileSystemItemsList from "@/components/FileSystem/ItemsList/FileSystemItemsList";

const FoldersPage = () => {
    const status = useAppSelector(state => state.fileSystemReducer.status);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fileSystemActions.resetFilters());
        dispatch(loadingFolderList());
    }, []);

    return (
        (status==='loading'||status==='initial')?
            <FileSystemLoader/>
            :
            <FileSystemItemsList/>
    );
};

export default FoldersPage;