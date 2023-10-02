import React, {useMemo, useRef} from 'react';
import classes from "./FileCatalog.module.css";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import FileList from "@/components/FileSystem/FileList/FileList";
import FileCatalogSorter from "@/components/FileSystem/FileCatalogSorter/FileCatalogSorter";
import {IFileCatalogItem} from "@/entites/files/fileCatalogItem";
import FileCatalogSearch from "@/components/FileSystem/FileCatalogSearch/FileCatalogSearch";
import UploadFileButton from "@/components/FileSystem/UploadFileButton/UploadFileButton";
import {checkFilesExtension} from "@/components/FileSystem/FileCatalog/helpers";
import {notificationSlice} from "@/components/Notification/store/NotificationSlice";
import ModalForFileCatalogItemNaming from "@/components/FileSystem/ModalForFileCatalogItemNaming/ModalForFileCatalogItemNaming";
import DragAndDropFilesArea from "@/components/FileSystem/DragAndDropFilesArea/DragAndDropFilesArea";
import GoOutFromFolder from "@/components/FileSystem/GoOutFromFolder/GoOutFromFolder";
import DeleteFilesButton from "@/components/FileSystem/DeleteFilesButton/DeleteFilesButton";
import {fileSystemSlice} from "@/app/(content)/files/Store/FileSystem/FileSystemSlise";
import ModalForDeleteFileCatalogItem
    from "@/components/FileSystem/ModalForDeleteFileCatalogItem/ModalForDeleteFileCatalogItem";
import ReloadingButton from "@/components/FileSystem/ReloadingButton/ReloadingButton";
import RenameCatalogItemButton from "@/components/FileSystem/RenameCatalogItemButton/RenameCatalogItemButton";

const FileCatalog = () => {
    const dispatch = useAppDispatch();
    const {loadingFiles, folderList, fileList, currentFolderId,
        searchQuery, sortingMethod,
        isModalForDragAndDropAreaVisible, modalForFileCatalogItemNamingIsVisible,
        modalForDeleteItemIsVisible, sortingType, selectedFileSystemObjectIds} = useAppSelector(state => state.fileSystemReducer)
    const currentFilesForUpload = useRef<FileList|null>(null)
    function sorting(firstFileItem: IFileCatalogItem, secondFileItem: IFileCatalogItem): number{
        switch (sortingMethod){
            case 'name':
                return sortingType === 'byAscending'?firstFileItem.name.localeCompare(secondFileItem.name):-firstFileItem.name.localeCompare(secondFileItem.name)
            case 'size':
                if(firstFileItem.size !== undefined && secondFileItem.size !== undefined){
                    if(firstFileItem.size > secondFileItem.size) return sortingType === 'byAscending'?1:-1
                    else if(firstFileItem.size < secondFileItem.size) return sortingType === 'byAscending'?-1:1
                    return 0
                }
                break
            case 'filesNumber':
                if(firstFileItem.filesNumber !== undefined && secondFileItem.filesNumber !== undefined){
                    if(firstFileItem.filesNumber > secondFileItem.filesNumber) return sortingType === 'byAscending'?1:-1
                    else if(firstFileItem.filesNumber < secondFileItem.filesNumber) return sortingType === 'byAscending'?-1:1
                    return 0
                }
                break
            case 'uploadDate':
                if(firstFileItem.uploadDate !== null && secondFileItem.uploadDate !==null){
                    return sortingType === 'byAscending'?firstFileItem.uploadDate.localeCompare(secondFileItem.name):-firstFileItem.uploadDate.localeCompare(secondFileItem.name)
                }
                return 0
        }
        return 0
    }

    const sortedFileList = useMemo(() => {
        if(currentFolderId){
            return [...fileList].sort((a, b) => sorting(a, b))
        }
        else return [...folderList].sort((a, b) => sorting(a,b))
    }, [sortingMethod, folderList, fileList, sortingType])

    const sortedAndFilteredFileList = useMemo(() => {
        return sortedFileList.filter((fileItem) => fileItem.name.includes(searchQuery))
    }, [searchQuery, sortedFileList])


    const onUploadFileButtonClick = (fileList : FileList) => {
        console.log(fileList)
        if(checkFilesExtension(fileList)){
            currentFilesForUpload.current = fileList;
            dispatch(fileSystemSlice.actions.openModalWindowForFileCatalogItemNaming({fileCatalogItemNamingType: 'createFolder', initialName: fileList[0].name}))
        }
        else {
            dispatch(notificationSlice.actions.createNotificationWithTimer('File extension is not valid'))
            currentFilesForUpload.current = null;
        }
    }

    return (
        <div className={classes.fileCatalogContainer}>
            <div className={classes.fileCatalogHelperContainer}>
                <div className={classes.leftFileCatalogHelper}>
                    <FileCatalogSearch></FileCatalogSearch>
                    <UploadFileButton onFileSelect={onUploadFileButtonClick}></UploadFileButton>
                    <GoOutFromFolder></GoOutFromFolder>
                </div>
                <div className={classes.rightFileCatalogHelper}>
                    <RenameCatalogItemButton></RenameCatalogItemButton>
                    <DeleteFilesButton></DeleteFilesButton>
                    <ReloadingButton></ReloadingButton>
                    <FileCatalogSorter></FileCatalogSorter>
                </div>
            </div>
            <hr className={classes.fileCatalogLine}/>
            {loadingFiles?<p>Loading</p>:<FileList fileList={sortedAndFilteredFileList}/>}
            {isModalForDragAndDropAreaVisible&&<DragAndDropFilesArea onFileSelect={onUploadFileButtonClick}></DragAndDropFilesArea>}
            {modalForFileCatalogItemNamingIsVisible&&<ModalForFileCatalogItemNaming fileList={currentFilesForUpload.current}></ModalForFileCatalogItemNaming>}
            {modalForDeleteItemIsVisible&&<ModalForDeleteFileCatalogItem></ModalForDeleteFileCatalogItem>}
        </div>
    );
};

export default FileCatalog;