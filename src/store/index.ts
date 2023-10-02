import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "@/components/AuthModule/UserStore/UserSlise"
import searchReducer from "@/components/SearchFieldsList/Store/Reducers/Search/SearchSlise"
import fileSystemReducer from "@/app/(content)/files/Store/FileSystem/FileSystemSlise"
import notificationReducer from "@/components/Notification/store/NotificationSlice"

const rootReducer = combineReducers({
    userReducer,
    searchReducer,
    fileSystemReducer,
    notificationReducer
})

export const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
        devTools: process.env.NODE_ENV !== 'production'
    })

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch