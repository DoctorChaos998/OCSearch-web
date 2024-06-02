'use client'
import React, {useEffect, useState} from 'react';
import {useDebounce} from "@/hooks/debounce";
import {fileSystemActions} from "@/lib/features/fileSystemSlice/fileSystemSlice";
import classes from "./FileSystemSearcher.module.scss";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";


const FileSystemSearcher = () => {
    const [searchQueryOver, setSearchQuery] = useState<string>('');
    const searchQuery = useAppSelector(state => state.fileSystemReducer.searchQuery);
    const dispatch = useAppDispatch();
    const debounced = useDebounce(searchQueryOver, 500)

    useEffect(() => {
        setSearchQuery(searchQuery)
    }, [searchQuery]);
    useEffect(() => {
        dispatch(fileSystemActions.setSearchQuery(debounced));
    }, [debounced])

    return (
        <label className={classes.fileCatalogSearchContainer}>
            <input className={classes.fileCatalogSearchInput} value={searchQueryOver} onChange={(event) => setSearchQuery(event.target.value)} placeholder={"Search"}/>
            <span className={`material-icons ${classes.fileCatalogSearchIcon}`}>
                find_in_page
            </span>
        </label>
    );
};

export default FileSystemSearcher;