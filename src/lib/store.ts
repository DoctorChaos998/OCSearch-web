import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {fileSystemReducer} from "@/lib/features/fileSystemSlice/fileSystemSlice";
import {notificationReducer} from "@/lib/features/notificationSlice/notificationSlice";
import {parsingReducer} from "@/lib/features/parsingSlice/parsingSlice";
import {uploadingProcessReducer} from "@/lib/features/uploadingProcessSlice/uploadingProcessSlice";
import {userReducer} from "@/lib/features/userSlice/userSlice";


const rootReducer = combineReducers({
    fileSystemReducer,
    userReducer,
    notificationReducer,
    parsingReducer,
    uploadingProcessReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch