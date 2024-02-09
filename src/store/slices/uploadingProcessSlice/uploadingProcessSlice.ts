import {status} from "@/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
interface IUploadingProcessSlice{
    status: status;
    percent: number
}
const initialState: IUploadingProcessSlice = {
    status: 'initial',
    percent: 0
}
const uploadingProcessSlice = createSlice({
    name: 'uploadingProcessSlice',
    initialState,
    reducers: {
        setStatus(state, action: PayloadAction<status>){
            state.status = action.payload
        },
        setPercent(state, action: PayloadAction<number>){
            state.percent = action.payload;
        }
    }
})

export const {actions: uploadingProcessActions, reducer: uploadingProcessReducer} = uploadingProcessSlice;