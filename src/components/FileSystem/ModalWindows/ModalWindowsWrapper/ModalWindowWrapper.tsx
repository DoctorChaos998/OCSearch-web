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
    const deleteMWIsVisible = useAppSelector(state => state.fileSystemReducer.deleteModalWindow.isVisible);
    const previewMWIsVisible = useAppSelector(state => state.fileSystemReducer.previewModalWindow.isVisible);
    const renameMWIsVisible = useAppSelector(state => state.fileSystemReducer.renameModalWindow.isVisible);
    const createMWIsVisible = useAppSelector(state => state.fileSystemReducer.createFolderModalWindow.isVisible);
    const itemInfoMWIsVisible = useAppSelector(state => state.fileSystemReducer.itemInfoModalWindow.isVisible);
    return (
        <>
            {deleteMWIsVisible&&<DeleteModalWindow></DeleteModalWindow>}
            {previewMWIsVisible&&<PreviewModalWindow></PreviewModalWindow>}
            {renameMWIsVisible&&<RenameModalWindow></RenameModalWindow>}
            {createMWIsVisible&&<CreateFolderModalWindow></CreateFolderModalWindow>}
            {itemInfoMWIsVisible&&<ItemInfoModalWindow></ItemInfoModalWindow>}
        </>
    );
};

export default FileSystemMWWrapper;