import {userSlice} from "./UserSlise";
import AuthService from "@/store/api/Api";
import {AppDispatch} from "@/store";
import {IAuthResponse} from "@/entites/dtos/authResponse";
import api, {API_URL} from "@/http/axiosConfig";
import axios from "axios";

export const login = (nickname:string, password: string, rememberMe: boolean) => async (dispatch: AppDispatch) =>{
    try {
        dispatch(userSlice.actions.userLogin())
        const response = await AuthService.login(nickname, password, rememberMe)
        dispatch(userSlice.actions.userLoginSuccess(response.data))
    } catch (e: any) {
        dispatch(userSlice.actions.userLoginError(e.response?.data?.message))
    }
}

export const logout = () => async (dispatch: AppDispatch) =>{
    try {
        dispatch(userSlice.actions.userLogout())
        await AuthService.logout()
        dispatch(userSlice.actions.userLogoutSuccess())
    } catch (e: any) {
        dispatch(userSlice.actions.userLogoutError(e.response?.data?.message))
    }
}
// export const registration = (nickname:string, password: string) => async (dispatch: AppDispatch) =>{
//     try {
//         dispatch(userSlice.actions.userRegistration())
//         const response = await AuthService.registration(nickname, password)
//         localStorage.setItem('token', response.data.accessToken)
//         dispatch(userSlice.actions.userRegistrationSuccess(response.data.user))
//     } catch (e: any) {
//         dispatch(userSlice.actions.userRegistrationError(e.response?.data?.message))
//     }
// }

export const checkAuth = () => async (dispatch: AppDispatch) =>{
    try {
        dispatch(userSlice.actions.userCheckAuth())
        const response = await AuthService.checkAuth()
        dispatch(userSlice.actions.userCheckAuthSuccess(response.data))
        //dispatch(userSlice.actions.setApiInterceptor())
    } catch (e: any) {
        dispatch(userSlice.actions.userCheckAuthError(e.response?.data?.message))
    }
}

export const setAccess = () => (dispatch: AppDispatch) => {
    const createSetRetryInterceptor = () => async (error: any) => {
        const originalRequest = error.config
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            try {
                originalRequest._isRetry = true
                const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
                dispatch(userSlice.actions.setAccessToken(response.data.accessToken))
                return api.request(originalRequest)
            } catch (e: any) {
                dispatch(userSlice.actions.userLogoutSuccess())
            }
        }
        throw error
    }
    const setRetryInterceptor = createSetRetryInterceptor()
    api.interceptors.response.use((config) => {
        return config
    }, setRetryInterceptor)
}