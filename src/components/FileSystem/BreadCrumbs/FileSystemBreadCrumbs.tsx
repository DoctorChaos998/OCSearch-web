'use client'
import React from 'react';
import {useAppSelector} from "@/hooks";
import {useParams} from "next/navigation";
import FileSystemExitButton from "@/components/FileSystem/ExitButton/FileSystemExitButton";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import classes from "./FileSystemBreadCrumbs.module.scss";

const FileSystemBreadCrumbs = () => {
    const status = useAppSelector(state => state.fileSystemReducer.status);
    const folderName = useAppSelector(state => state.fileSystemReducer.currentFolderName);
    const params = useParams<{folderId: string}>();
    return (
        params.folderId?
            <div className={classes.container}>
                <FileSystemExitButton></FileSystemExitButton>
                    {status !== 'success'?
                        <Skeleton width={200} height={38} baseColor="#202020" highlightColor="#833ab4" borderRadius={20}></Skeleton>
                    :
                        <div className={classes.headerContainer}>
                            <h2 title={folderName} className={classes.header}>{folderName}</h2>
                        </div>}
            </div>
            :
            <div className={classes.headerContainer}>
                <h2 title={folderName} style={{marginLeft:50}} className={classes.header}>All folders</h2>
            </div>

    );
};

export default FileSystemBreadCrumbs;