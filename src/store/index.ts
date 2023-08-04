import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "@/store/user/UserSlise"
import searchReducer from "@/components/SearchFieldsList/Store/Reducers/Search/SearchSlise"

const rootReducer = combineReducers({
    userReducer,
    searchReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
        devTools: process.env.NODE_ENV !== 'production'
    })
}
export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']