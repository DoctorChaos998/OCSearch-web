import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IFileSystem{
    isModalVisible: boolean
    inputError: boolean
    currentFolder: string
}
const initialState: IFileSystem = {
    isModalVisible: false,
    inputError:false,
    currentFolder: '',
}
export const fileSystemSlice = createSlice({
    name: "FileSystemSlice",
    initialState,
    reducers: {
        setIsModalVisible(state,action: PayloadAction<boolean>){
            state.isModalVisible = action.payload
        },
        setInputError(state, action: PayloadAction<boolean>) {
            state.inputError = action.payload
        },
    }
})
export default fileSystemSlice.reducer