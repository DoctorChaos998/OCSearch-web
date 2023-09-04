import {File} from "buffer";
import {validFileExtensions} from "@/entites/files/validFileExtensions";

export function checkFilesExtension(fileList: FileList) {
    return !Array.prototype.find.call(fileList, (file: File) => {
        console.log(file)
        if(!checkFileExtension(file)) return true
    })
}
export function checkFileExtension(file: File) {
    return validFileExtensions.includes(file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length))
}