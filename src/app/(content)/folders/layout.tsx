import React from "react";
import {Metadata} from "next";
import classes from "./folders.module.scss";
import FileSystemHelper from "@/components/FileSystem/Helper/FileSystemHelper";
import FileSystemBreadCrumbs from "@/components/FileSystem/BreadCrumbs/FileSystemBreadCrumbs";
import DragAndDropFilesArea from "@/components/FileSystem/DragAndDropFilesArea/DragAndDropFilesArea";
import CreateFolderModalWindow from "@/components/FileSystem/CreateFolderModalWindow/CreateFolderModalWindow";
import RenameModalWindow from "@/components/FileSystem/RenameModalWindow/RenameModalWindow";
import FileProvider from "@/components/FileSystem/FileContext/FileContext";
import DeleteModalWindow from "@/components/FileSystem/DeleteModalWindow/DeleteModalWindow";
import PreviewContainer from "@/components/FileSystem/PreviewContainer/PreviewContainer";
import ItemInfoModalWindow from "@/components/FileSystem/ItemInfoModalWindow/ItemInfoModalWindow";


export const metadata: Metadata = {
    title: 'File system',
}
export default function ContentLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <FileProvider>
            <div className={classes.container}>
                <FileSystemHelper/>
                <FileSystemBreadCrumbs/>
                {children}
                <DragAndDropFilesArea/>
                <CreateFolderModalWindow/>
                <RenameModalWindow/>
                <DeleteModalWindow/>
                <PreviewContainer/>
                <ItemInfoModalWindow/>
            </div>
        </FileProvider>
    )
}