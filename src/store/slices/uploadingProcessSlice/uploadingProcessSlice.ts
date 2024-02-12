import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type uploadingStatus = 'loading'|'error'|'success';


interface IUploadingProcessSlice{
    isActive: boolean,
    uploadingList: {
        id: number,
        status: uploadingStatus,
        progress: number,
        firstFileName: string,
        uploadingSize: string,
        filesNumber: number
    }[]
}
const initialState: IUploadingProcessSlice = {
    isActive: false,
    uploadingList: []
}
const uploadingProcessSlice = createSlice({
    name: 'uploadingProcessSlice',
    initialState,
    reducers: {
        addUploading(state,action: PayloadAction<{id: number, firstFileName: string, uploadingSize: string, filesNumber: number}>){
            if(!state.isActive) state.isActive = true;
            state.uploadingList.push({...action.payload, status:'loading', progress:0});
        },
        setUploadingProgress(state, action: PayloadAction<{id: number, progress: number}>){
            state.uploadingList.find(upload => upload.id === action.payload.id)!.progress = action.payload.progress;
        },
        setStatusUploading(state, action:PayloadAction<{id: number, status: uploadingStatus}>){
            state.uploadingList.find(upload => upload.id === action.payload.id)!.status = action.payload.status;
        },
        trySetInactive(state){
            if(!state.uploadingList.find(upload => upload.status!=='success')){
                state.isActive = false;
                state.uploadingList = [];
            }
        }
    }
})

export const {actions: uploadingProcessActions, reducer: uploadingProcessReducer} = uploadingProcessSlice;