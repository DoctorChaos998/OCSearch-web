import {useRef} from "react";
import {checkFilesExtension} from "@/helpers/fileSystemHelper";
import {fileSystemActions} from "@/store/slices/fileSystemSlice/fileSystemSlice";
import {
    uploadFiles,
    uploadFilesInFolder,
} from "@/store/slices/fileSystemSlice/fileSystemActions";
import {useAppDispatch, useAppSelector} from "@/hooks/index";
import {useParams} from "next/navigation";

export function useSelectFilesToUpload() {
    const userName = useAppSelector(state => state.userReducer.nickname);
    const currentSelectedFiles = useRef<FileList>({} as FileList);
    const dispatch = useAppDispatch();
    const params = useParams<{folderId: string}>();
    const selectFilesToUpload = (fileList: FileList) => {
        if(fileList.length>0 && checkFilesExtension(fileList)){
            if(!params.folderId){
                currentSelectedFiles.current = fileList;
                dispatch(fileSystemActions.openCreateFolderModalWindow(fileList[0].name.slice(0, fileList[0].name.lastIndexOf('.'))));
            }
            else {
                dispatch(uploadFilesInFolder(fileList, +params.folderId, userName));
            }
        }
    }
    const getCurrentSelectedFiles = (): FileList => {
        return currentSelectedFiles.current;
    }
    const uploadFilesInNewFolder = (folderName: string) => {
        dispatch(uploadFiles(currentSelectedFiles.current, folderName));
    }
    return {selectFilesToUpload, getCurrentSelectedFiles, uploadFilesInNewFolder};
}