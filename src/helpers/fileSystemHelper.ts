import {File} from "buffer";
import {validFileExtensions} from "@/entities/fileSystem";

export function checkFilesExtension(fileList: FileList): File|undefined {
    return Array.prototype.find.call(fileList, (file: File) => {
        if(!validFileExtensions.includes(file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length))) return true
    })
}
