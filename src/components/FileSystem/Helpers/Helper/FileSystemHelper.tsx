import React from 'react';
import classes from "./FileSystemHelper.module.scss";
import FileSystemSearcher from "@/components/FileSystem/Helpers/Searcher/FileSystemSearcher";
import UploadFileButton from "@/components/FileSystem/Helpers/UploadFileButton/UploadFileButton";
import FileSystemRenameButton from "@/components/FileSystem/Helpers/RenameButton/FileSystemRenameButton";
import FileSystemDeleteButton from "@/components/FileSystem/Helpers/DeleteButton/FileSystemDeleteButton";
import FileSystemSorter from "@/components/FileSystem/Helpers/Sorter/FileSystemSorter";
import MobileHelper from "@/components/FileSystem/Helpers/MobileHelper/MobileHelper";
import ParsingButton from "@/components/FileSystem/Helpers/ParsingButton/ParsingButton";

const FileSystemHelper = () => {
    return (
        <div className={classes.mainContainer}>
            <div className={classes.container}>
                <div className={classes.leftHelperContainer}>
                    <FileSystemSearcher/>
                    <UploadFileButton/>
                </div>
                <ParsingButton/>
                <div className={classes.rightHelperContainer}>
                    <FileSystemRenameButton/>
                    <FileSystemDeleteButton/>
                    <FileSystemSorter/>
                </div>
                <MobileHelper/>
            </div>
            <hr className={classes.separatingLine}/>
        </div>
    );
};

export default FileSystemHelper;