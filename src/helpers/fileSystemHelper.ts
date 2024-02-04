import {File} from "buffer";
import {validFileExtensions} from "@/entities/fileSystem";

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