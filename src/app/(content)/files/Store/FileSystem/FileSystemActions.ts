import {AppDispatch} from "@/store";
import FileService from "@/app/(content)/files/Api/Api";
import {fileSystemSlice} from "@/app/(content)/files/Store/FileSystem/FileSystemSlise";

export const checkFileName = (fileName: string) => async (dispatch: AppDispatch) =>{
    try {
        if(fileName === "111"){
            dispatch(fileSystemSlice.actions.setIsModalVisible(false))
        }
        else {
            dispatch(fileSystemSlice.actions.setInputError(true))
        }
        //const response = await FileService.checkFileName(fileName)
    } catch (e: any) {
    }
}
export const uploadsFile = (files: FileList, directoryName: string) => async (dispatch: AppDispatch) => {
    try {
        console.log('check', files, directoryName)
    } catch (e: any) {

    }
}