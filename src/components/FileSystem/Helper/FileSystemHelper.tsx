import React from 'react';
import classes from "./FileSystemHelper.module.scss";
import UploadFileButton from "@/components/FileSystem/UploadFileButton/UploadFileButton";
import FileSystemSearcher from "@/components/FileSystem/Searcher/FileSystemSearcher";
import FileSystemSorter from "@/components/FileSystem/Sorter/FileSystemSorter";
import FileSystemReloadingButton from "@/components/FileSystem/ReloadingButton/FileSystemReloadingButton";
import FileSystemRenameButton from "@/components/FileSystem/RenameButton/FileSystemRenameButton";
import FileSystemDeleteButton from "@/components/FileSystem/DeleteButton/FileSystemDeleteButton";
const FileSystemHelper = () => {
    return (
        <div className={classes.container}>
            <div className={classes.leftHelperContainer}>
                <FileSystemSearcher></FileSystemSearcher>
                <UploadFileButton></UploadFileButton>
            </div>
            <div className={classes.rightHelperContainer}>
                <FileSystemRenameButton></FileSystemRenameButton>
                <FileSystemDeleteButton></FileSystemDeleteButton>
                <FileSystemReloadingButton></FileSystemReloadingButton>
                <FileSystemSorter></FileSystemSorter>
            </div>
        </div>
    );
};

export default FileSystemHelper;