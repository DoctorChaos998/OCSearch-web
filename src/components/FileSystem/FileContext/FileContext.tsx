'use client'
import React, {createContext, FC, PropsWithChildren, useContext, useRef, useState} from 'react';
import {useSelectFilesToUpload} from "@/hooks/selectFilesToUpload";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {useParams} from "next/navigation";
import {checkFilesExtension} from "@/helpers/fileSystemHelper";
import {fileSystemActions} from "@/store/slices/fileSystemSlice/fileSystemSlice";
import {uploadFiles, uploadFilesInFolder} from "@/store/slices/fileSystemSlice/fileSystemActions";
import {notificationActions} from "@/store/slices/notificationSlice/notificationSlice";


interface IFileContext {
    selectFilesToUpload: (fileList: FileList) => void;
    getCurrentSelectedFiles: () => FileList;
    uploadFilesInNewFolder: (folderName: string) => void;
}
export const FileContext = createContext<IFileContext|undefined>(undefined);
const FileProvider: FC<PropsWithChildren> = ({children}) => {
    const fileProviderValue = useSelectFilesToUpload();
    return (
        <FileContext.Provider value={fileProviderValue}>
            {children}
        </FileContext.Provider>
    );
};

export const useFileContext = (): IFileContext => {
    const context = useContext(FileContext);
    if (!context) {
        throw new Error('useFileContext must be used within a FileProvider');
    }
    return context;
};

export default FileProvider;