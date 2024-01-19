'use client'
import React, {useEffect, useLayoutEffect, useMemo} from 'react';
import {useParams, useRouter} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {loadingFileList} from "@/store/slices/fileSystemSlice/fileSystemActions";
import {type IFile} from "@/entities/fileSystem";
import FilesList from "@/components/FileSystem/FilesList/FilesList";
import {fileSystemActions} from "@/store/slices/fileSystemSlice/fileSystemSlice";
import classes from "./files.module.scss";
import FileSystemLoader from "@/components/FileSystem/FileSystemLoader/FileSystemLoader";

const Page = () => {
    const params: {folderId: string} = useParams();
    const dispatch = useAppDispatch();
    const {status, sorter, fileSystemItems, searchQuery} = useAppSelector(state => state.fileSystemReducer);
    const router = useRouter();
    useLayoutEffect(() => {
        dispatch(fileSystemActions.resetFilters());
        if(+params.folderId === +params.folderId){
            dispatch(loadingFileList(+params.folderId));
        }
        else{
            router.push('/folders');
        }
    }, []);

    useEffect(() => {
        if(status === 'error') router.push('/folders');
    }, [status]);

    const selectAllFilesHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        if(event.ctrlKey && event.code === 'KeyA'){
            dispatch(fileSystemActions.selectAllItems('files'));
        }
    }
    const sortingFiles = (firstFileItem: IFile, secondFileItem: IFile): number => {
        switch (sorter.target){
            case 'name':
                return sorter.order === 'byAscending'?firstFileItem.name.localeCompare(secondFileItem.name):-firstFileItem.name.localeCompare(secondFileItem.name);
            case 'size':
                if(firstFileItem.size === null) return sorter.order === 'byAscending'?1:-1;
                if(secondFileItem.size === null) return sorter.order === 'byAscending'?-1:1;
                if(firstFileItem.size! > secondFileItem.size!) return sorter.order === 'byAscending'?1:-1;
                if(firstFileItem.size! < secondFileItem.size!) return sorter.order === 'byAscending'?-1:1;
                return 0;
            case 'uploadDate':
                if(firstFileItem.uploadDate === null) return sorter.order === 'byAscending'?1:-1;
                if(secondFileItem.uploadDate === null) return sorter.order === 'byAscending'?-1:1;
                return sorter.order === 'byAscending'?firstFileItem.uploadDate.localeCompare(secondFileItem.uploadDate):-firstFileItem.uploadDate.localeCompare(secondFileItem.uploadDate);
            default: return 0;
        }
    }
    const sortedFiles: IFile[] = useMemo(() => {
        return [...fileSystemItems.files].sort((a, b) => sortingFiles(a,b));
    },[sorter.order, sorter.target, fileSystemItems])

    const sortedAndFilteredFiles: IFile[] = useMemo(() => {
        return sortedFiles.filter((value) => value.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [sortedFiles, searchQuery])
    return (
        (status==='loading'||status==='initial')?
            <FileSystemLoader/>:
            <div onKeyDown={selectAllFilesHandler} tabIndex={1} className={classes.filesContainer} onClick={() => dispatch(fileSystemActions.deselectAllItems())}>
                <FilesList fileList={sortedAndFilteredFiles}></FilesList>
            </div>
    );
};

export default Page;