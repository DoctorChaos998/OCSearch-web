import React from "react";
import {Metadata} from "next";
import classes from "./folders.module.scss";
import FileSystemBreadCrumbs from "@/components/FileSystem/BreadCrumbs/FileSystemBreadCrumbs";
import DragAndDropFilesArea from "@/components/FileSystem/DragAndDropFilesArea/DragAndDropFilesArea";
import FileProvider from "@/components/FileSystem/FileContext/FileContext";
import FileSystemHelper from "@/components/FileSystem/Helpers/Helper/FileSystemHelper";
import FileSystemMWWrapper from "@/components/FileSystem/ModalWindows/ModalWindowsWrapper/ModalWindowWrapper";


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
                <FileSystemMWWrapper/>
            </div>
        </FileProvider>
    )
}