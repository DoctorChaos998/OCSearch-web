'use client'
import React from 'react';
import {useAppSelector} from "@/lib/hooks";
import DeleteModalWindow from "@/components/FileSystem/ModalWindows/DeleteModalWindow/DeleteModalWindow";
import PreviewModalWindow from "@/components/FileSystem/ModalWindows/PreviewModalWindow/PreviewModalWindow";
import RenameModalWindow from "@/components/FileSystem/ModalWindows/RenameModalWindow/RenameModalWindow";
import CreateFolderModalWindow
    from "@/components/FileSystem/ModalWindows/CreateFolderModalWindow/CreateFolderModalWindow";
import ItemInfoModalWindow from "@/components/FileSystem/ModalWindows/ItemInfoModalWindow/ItemInfoModalWindow";

const FileSystemMWWrapper = () => {
    const itemDeletionPopupIsVisible = useAppSelector(state => state.fileSystemReducer.itemDeletionPopup.isVisible);
    const previewPopupIsVisible = useAppSelector(state => state.fileSystemReducer.previewPopup.isVisible);
    const itemRenamingPopupIsVisible = useAppSelector(state => state.fileSystemReducer.itemRenamingPopup.isVisible);
    const folderCreationPopupIsVisible = useAppSelector(state => state.fileSystemReducer.folderCreationPopup.isVisible);
    const itemInfoPopupIsVisible = useAppSelector(state => state.fileSystemReducer.itemInfoPopup.isVisible);
    return (
        <>
            {itemDeletionPopupIsVisible&&<DeleteModalWindow></DeleteModalWindow>}
            {previewPopupIsVisible&&<PreviewModalWindow></PreviewModalWindow>}
            {itemRenamingPopupIsVisible&&<RenameModalWindow></RenameModalWindow>}
            {folderCreationPopupIsVisible&&<CreateFolderModalWindow></CreateFolderModalWindow>}
            {itemInfoPopupIsVisible&&<ItemInfoModalWindow></ItemInfoModalWindow>}
        </>
    );
};

export default FileSystemMWWrapper;