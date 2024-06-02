import {File} from "buffer";
import {validFileExtensions} from "@/entities/fileSystem";
import {IFile, IFileSystemItem, IFolder} from "@/types/fileSystem";

export function checkFilesExtension(fileList: FileList): File|undefined {
    return Array.prototype.find.call(fileList, (file: File) => {
        if(!validFileExtensions.includes(file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length))) return true
    })
}

export function fileSizeToString(fileSize: number|null): string {
    if(fileSize === null) return 'Undefined';
    if(fileSize<1024) return fileSize + " B";
    else if(fileSize<1024*1024) return (fileSize/1024).toFixed(2) + " KB";
    else if(fileSize<1024*1024*1024) return (fileSize/1024/1024).toFixed(2) + " MB";
    return (fileSize/1024/1024/1024).toFixed(2) + " GB";
}

export function sortingFileSystemItemsByNameAscending(firstItem: IFileSystemItem, secondItem: IFileSystemItem): number {
    return firstItem.name.localeCompare(secondItem.name);
}

export function sortingFileSystemItemsByFilesNumberAscending(firstItem: IFolder|IFile, secondItem: IFolder|IFile): number {
    if("filesNumber" in firstItem && "filesNumber" in secondItem){
        if(firstItem.filesNumber === secondItem.filesNumber) return 0;
        return firstItem.filesNumber > secondItem.filesNumber?1:-1;
    }
    return 0;
}

export function sortingFileSystemItemsByUploadDateAscending(firstItem: IFolder|IFile, secondItem: IFolder|IFile): number {
    if("uploadDate" in firstItem && "uploadDate" in secondItem){
        if(firstItem.uploadDate === null) return 1;
        if(secondItem.uploadDate === null) return -1;
        return firstItem.uploadDate.localeCompare(secondItem.uploadDate);
    }
    else if("lastUploadDate" in firstItem && "lastUploadDate" in secondItem){
        if(firstItem.lastUploadDate === null) return 1;
        if(secondItem.lastUploadDate === null) return -1;
        return firstItem.lastUploadDate.localeCompare(secondItem.lastUploadDate);
    }
    return 0;
}

export function sortingFileSystemItemsBySizeAscending(firstItem: IFolder|IFile, secondItem: IFolder|IFile): number {
    if("uploadDate" in firstItem && "uploadDate" in secondItem){
        if(firstItem.size === null) return 1;
        if(secondItem.size === null) return -1;
        if(firstItem.size === secondItem.size) return 0;
        return firstItem.size > secondItem.size?1:-1;
    }
    return 0;
}