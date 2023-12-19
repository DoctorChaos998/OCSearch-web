'use client'
import React, {FC, PropsWithChildren, useLayoutEffect, useState} from 'react';
import FileSystemHelper from "@/components/FileSystem/Helper/FileSystemHelper";
import classes from "./FileSystemLayout.module.scss";
import DragAndDropFilesArea from "@/components/FileSystem/DragAndDropFilesArea/DragAndDropFilesArea";
import {useAppDispatch} from "@/hooks";
import CreateFolderModalWindow from "@/components/FileSystem/CreateFolderModalWindow/CreateFolderModalWindow";
import {fileSystemActions} from "@/store/slices/fileSystemSlice/fileSystemSlice";
import {useParams, useRouter} from "next/navigation";
import FileSystemBreadCrumbs from "@/components/FileSystem/BreadCrumbs/FileSystemBreadCrumbs";
import Link from "next/link";
import {checkFilesExtension} from "@/helpers/fileSystemHelper";
import {uploadFilesInFolder} from "@/store/slices/fileSystemSlice/fileSystemActions";
import RenameModalWindow from "@/components/FileSystem/RenameModalWindow/RenameModalWindow";
import FileProvider, {FileContext} from "@/components/FileSystem/FileContext/FileContext";

const FileSystemLayout: FC<PropsWithChildren> = ({children}) => {
    const dispatch = useAppDispatch();
    const params = useParams<{folderId: string}>();
    const router = useRouter();
    useLayoutEffect(() => {
        dispatch(fileSystemActions.resetFilters());
        if(+params.folderId !== +params.folderId) router.push('/folders');
    }, [])
    const selectAllFilesHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        if(event.ctrlKey && event.code === 'KeyA'){
            dispatch(fileSystemActions.selectAllItems(params?'files':'folders'));
        }
    }
    // const onSelectUploadFiles = (fileList: FileList) => {
    //
    // }
    return (
        <FileProvider>
            <Link href={'/folders'}>dfgdgd</Link>
            <FileSystemHelper></FileSystemHelper>
            <hr className={classes.separatingLine}/>
            <FileSystemBreadCrumbs></FileSystemBreadCrumbs>
            <div className={classes.container} onKeyDown={selectAllFilesHandler} tabIndex={0} onClick={() => dispatch(fileSystemActions.deselectAllItems())}>
                {children}
            </div>
            <DragAndDropFilesArea></DragAndDropFilesArea>
            <CreateFolderModalWindow></CreateFolderModalWindow>
            <RenameModalWindow></RenameModalWindow>
        </FileProvider>
    );
};

export default FileSystemLayout;