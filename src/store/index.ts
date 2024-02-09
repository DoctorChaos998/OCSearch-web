import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {fileSystemReducer} from "@/store/slices/fileSystemSlice/fileSystemSlice";
import {userReducer} from "@/store/slices/userSlice/userSlice";
import {notificationReducer} from "@/store/slices/notificationSlice/notificationSlice";
import {parsingReducer} from "@/store/slices/parsingSlice/parsingSlice";
import {uploadingProcessReducer} from "@/store/slices/uploadingProcessSlice/uploadingProcessSlice";


const rootReducer = combineReducers({
    fileSystemReducer,
    userReducer,
    notificationReducer,
    parsingReducer,
    uploadingProcessReducer
})
export const store = configureStore({
    reducer: rootReducer,
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type status = 'loading'|'error'|'success'|'initial'