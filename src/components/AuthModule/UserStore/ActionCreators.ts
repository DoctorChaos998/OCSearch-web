import {userSlice} from "./UserSlise";
import AuthService from "@/components/AuthModule/Api/Api";
import {AppDispatch} from "@/store";
import api from "@/http/axiosConfig";
import {notificationSlice} from "@/components/Notification/store/NotificationSlice";

export const login = (nickname:string, password: string, rememberMe: boolean) => async (dispatch: AppDispatch) =>{
    try {
        dispatch(userSlice.actions.userLogin())
        const response = await AuthService.userLogin(nickname, password, rememberMe)
        dispatch(userSlice.actions.userLoginSuccess(response.data))
    } catch (e: any) {
        dispatch(notificationSlice.actions.createNotificationWithTimer(e.response?.data?.message))
        dispatch(userSlice.actions.userLoginError(e.response?.data?.message))
    }
}

export const logout = () => async (dispatch: AppDispatch) =>{
    try {
        dispatch(userSlice.actions.userLogout())
        await AuthService.userLogout()
        dispatch(userSlice.actions.userLogoutSuccess())
    } catch (e: any) {
        dispatch(notificationSlice.actions.createNotification(e.response?.data?.message))
        dispatch(userSlice.actions.userLogoutError(e.response?.data?.message))
    }
}
export const checkAuth = () => async (dispatch: AppDispatch) =>{
    try {
        dispatch(userSlice.actions.userCheckAuth())
        const response = await AuthService.userRefreshTokens()
        dispatch(userSlice.actions.userCheckAuthSuccess(response.data))
        //dispatch(userSlice.actions.setApiInterceptor())
    } catch (e: any) {
        dispatch(userSlice.actions.userCheckAuthError(e.response?.data?.message))
    }
}

export const setResponseInterceptor = () => (dispatch: AppDispatch) => {
    const createSetRetryInterceptor = () => async (error: any) => {
        const originalRequest = error.config
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            try {
                originalRequest._isRetry = true
                //const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
                const response = await AuthService.userRefreshTokens()
                dispatch(userSlice.actions.setAccessToken(response.data.accessToken))
                return api.request(originalRequest)
            } catch (e: any) {
                dispatch(notificationSlice.actions.createNotification(e.response?.data?.message))
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