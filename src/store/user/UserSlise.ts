import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "@/entites/user/user";
import {IAuthResponse} from "@/entites/dtos/authResponse";
import api from "@/http/axiosConfig";
import {InternalAxiosRequestConfig} from "axios";

const createSetRequestInterceptor = (accessToken:string) => (config:InternalAxiosRequestConfig<any>) => {
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
}

interface IUserState {
    user: IUser
    isLoading: boolean
    error: string
    isAuth: boolean
    loginError: string
    accessToken: string
}

const initialState: IUserState = {
    user: {} as IUser,
    isLoading: true,
    error: '',
    isAuth: false,
    loginError: '',
    accessToken: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin(state){
            state.isLoading = false
        },
        userLoginSuccess(state, action:PayloadAction<IAuthResponse>){
            state.isLoading = false
            state.loginError = ''
            state.user = action.payload.user
            state.isAuth = true
            state.accessToken = action.payload.accessToken
            const setAuthInterceptor = createSetRequestInterceptor(state.accessToken)
            api.interceptors.request.use(setAuthInterceptor)
        },
        userLoginError(state, action:PayloadAction<string>){
            state.isLoading = false
            state.loginError = action.payload
        },
        userLogout(state){
            state.isLoading = true
        },
        userLogoutSuccess(state){
            api.interceptors.response.clear()
            api.interceptors.request.clear()
            return {...initialState, isLoading: false}
        },
        userLogoutError(state, action:PayloadAction<string>){
            state.isLoading = false
            console.log(action.payload)
            state.error = action.payload
        },
        userCheckAuth(state){
            state.isLoading = true
        },
        userCheckAuthSuccess(state, action:PayloadAction<IAuthResponse>){
            state.isLoading = false
            state.error = ''
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
            state.isAuth = true
            const setAuthInterceptor = createSetRequestInterceptor(state.accessToken)
            api.interceptors.request.use(setAuthInterceptor)
        },
        userCheckAuthError(state, action:PayloadAction<string>){
            state.isLoading = false
            api.interceptors.response.clear()
            api.interceptors.request.clear()
            state.error = action.payload
        },
        setAccessToken(state, action: PayloadAction<string>) {
            state.accessToken = action.payload
            api.interceptors.request.clear()
            const setAuthInterceptor = createSetRequestInterceptor(state.accessToken)
            api.interceptors.request.use(setAuthInterceptor)
        },
    }
})
const {reducer} = userSlice
export default reducer