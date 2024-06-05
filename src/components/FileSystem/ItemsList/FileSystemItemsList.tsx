import React, {useEffect} from 'react';
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

    useEffect(() => {
        const selectAllItemsHandler = (event: KeyboardEvent) => {
            event.preventDefault();
            if(event.ctrlKey && event.code === 'KeyA'){
                dispatch(fileSystemActions.selectAllItems());
            }
            if(event.code === 'Delete' && selectedFileSystemItemIds.length>0){
                dispatch(fileSystemActions.openItemDeletionPopup(params.folderId?'file':'folder'));
            }
        };
        window.addEventListener('keydown', selectAllItemsHandler);
        return () => {
            window.removeEventListener('keydown', selectAllItemsHandler);
        }
    }, [selectedFileSystemItemIds.length]);

    return (
        <div className={classes.itemsListContainer}
             onClick={() => dispatch(fileSystemActions.deselectAllItems())}>
            {
                sortedAndFilteredItems.length === 0 ?
                    <h1 className={classes.header}>
                        {params.folderId?"Files":"Folders"} not exist
                    </h1>
                    :
                    sortedAndFilteredItems.map((item, index) => <FileSystemItem
                        key={item.id}
                        id={item.id}
                        onClickHandler={itemClickHandler}
                        onDoubleClickHandler={'status' in item?() => {
                            if(item.status === 'ready_for_parsing') dispatch(fileSystemActions.openPreviewPopup(item.id));
                            else dispatch(notificationActions.createNotification({notificationMessage: 'File is being processed', notificationType: 'warning'}));
                        }:() => router.push(`/folders/${item.id}`, {scroll: false})}
                        index={index}/>)
            }
        </div>
    );
};

export default FileSystemItemsList;