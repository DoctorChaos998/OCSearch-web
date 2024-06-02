import React from 'react';
import {useParams, useRouter} from "next/navigation";
import {useSelectFileSystemItems} from "@/hooks/selectFileSystemItems";
import FileSystemItem from "@/components/FileSystem/Item/FileSystemItem";
import {useFilteredAndSortedItems} from "@/hooks/FileSystem/filteredAndSortedItems";
import {fileSystemActions} from "@/lib/features/fileSystemSlice/fileSystemSlice";
import {notificationActions} from "@/lib/features/notificationSlice/notificationSlice";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import classes from "./FileSystemItemsList.module.scss";

const FileSystemItemsList = () => {
    const selectedFileSystemItemIds = useAppSelector(state => state.fileSystemReducer.selectedFileSystemItemIds);
    const {sortedAndFilteredItems, sortedAndFilteredItemIds} = useFilteredAndSortedItems();
    const itemClickHandler = useSelectFileSystemItems(sortedAndFilteredItemIds);
    const params = useParams<{folderId: string}>();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const selectAllFoldersHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        if(event.ctrlKey && event.code === 'KeyA'){
            dispatch(fileSystemActions.selectAllItems());
        }
        if(event.code === 'Delete' && selectedFileSystemItemIds.length>0){
            dispatch(fileSystemActions.openDeleteModalWindow(params.folderId?'folder':'file'));
        }
    }

    return (
        <div onKeyDown={selectAllFoldersHandler} tabIndex={1} className={classes.itemsListContainer}
             onClick={() => dispatch(fileSystemActions.deselectAllItems())}>
            {
                sortedAndFilteredItems.length === 0 ?
                    <h1 className={classes.header}>
                        Folders not exist
                    </h1>
                    :
                    sortedAndFilteredItems.map((item, index) => <FileSystemItem
                        key={item.id}
                        id={item.id}
                        onClickHandler={itemClickHandler}
                        onDoubleClickHandler={'status' in item?() => {
                            if(item.status === 'ready_for_parsing') dispatch(fileSystemActions.openPreviewModalWindow({
                                fileExtension: item.name.substring(item.name.lastIndexOf('.')) as 'txt'|'sql'|'csv'|'xlsx',
                                fileId: item.id}));
                            else dispatch(notificationActions.createNotification({notificationMessage: 'File is being processed', notificationType: 'warning'}));
                        }:() => router.push(`/folders/${item.id}`)}
                        index={index}/>)
            }
        </div>
    );
};

export default FileSystemItemsList;