import React, {useEffect, useState} from 'react';
import {useDebounce} from "@/components/FileSystem/FileCatalogSearch/hook";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {fileSystemSlice} from "@/app/(content)/files/Store/FileSystem/FileSystemSlise";
import classes from "./FileCatalogSearch.module.css";


const FileCatalogSearch = () => {
    const [searchQueryOver, setSearchQuery] = useState<string>('')
    const {searchQuery} = useAppSelector(state => state.fileSystemReducer)
    const dispatch = useAppDispatch()
    const debounced = useDebounce(searchQueryOver, 500)
    useEffect(() => {
        setSearchQuery(searchQuery)
    }, [searchQuery]);
    useEffect(() => {
        dispatch(fileSystemSlice.actions.setSearchQuery(debounced))
    }, [debounced])
    return (
        <div className={classes.fileCatalogSearchContainer}>
            <input className={classes.fileCatalogSearchInput} value={searchQueryOver} onChange={(event) => setSearchQuery(event.target.value)} placeholder={"Search in FileBrowser"}/>
            <span className={`material-icons ${classes.fileCatalogSearchIcon}`}>
                find_in_page
            </span>
        </div>

    );
};

export default FileCatalogSearch;