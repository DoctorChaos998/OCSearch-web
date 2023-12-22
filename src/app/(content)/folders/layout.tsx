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


export const metadata: Metadata = {
    title: 'File system',
}
export default function ContentLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <FileProvider>
            <div className={classes.container}>
                <FileSystemHelper></FileSystemHelper>
                <hr className={classes.separatingLine}/>
                <FileSystemBreadCrumbs></FileSystemBreadCrumbs>
                {children}
                <DragAndDropFilesArea></DragAndDropFilesArea>
                <CreateFolderModalWindow></CreateFolderModalWindow>
                <RenameModalWindow></RenameModalWindow>
                <DeleteModalWindow></DeleteModalWindow>
            </div>
        </FileProvider>
    )
}