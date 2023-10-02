import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "@/entites/user/user";
import api from "@/http/axiosConfig";
import {AxiosRequestConfig, AxiosRequestHeaders, InternalAxiosRequestConfig} from "axios";
import {IAuthResponse} from "@/components/AuthModule/Api/AuthResponse";

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
    headers: AxiosRequestHeaders
}
const createSetRequestInterceptor = (accessToken:string) => (config:AdaptAxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
}
//InternalAxiosRequestConfig<any>

interface IUserState {
    user: IUser
    isLoading: boolean
    error: string
    isAuth: boolean
    accessToken: string
}

const initialState: IUserState = {
    user: {} as IUser,
    isLoading: true,
    error: '',
    isAuth: false,
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
            state.user = action.payload.user
            state.isAuth = true
            state.accessToken = action.payload.accessToken
            //const setAuthInterceptor = createSetRequestInterceptor(state.accessToken)
            api.interceptors.request.use(createSetRequestInterceptor(state.accessToken))
        },
        userLoginError(state){
            state.isLoading = false
        },
        userLogout(state){
            state.isLoading = true
        },
        userLogoutSuccess(){
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
            api.interceptors.request.use(createSetRequestInterceptor(state.accessToken))
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
            api.interceptors.request.use(createSetRequestInterceptor(state.accessToken))
        },
    }
})
const {reducer} = userSlice
export default reducer