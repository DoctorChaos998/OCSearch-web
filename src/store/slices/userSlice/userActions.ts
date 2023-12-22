import {AppDispatch} from "@/store";
import {userActions} from "@/store/slices/userSlice/userSlice";
import UserService from "@/http/userService";
import {notificationActions} from "@/store/slices/notificationSlice/notificationSlice";
import api from "@/http";


export const login = (nickname:string, password: string, rememberMe: boolean) => async (dispatch: AppDispatch) =>{
    dispatch(userActions.userLogin());
    await UserService.login(nickname, password, rememberMe).then(value => {
        dispatch(userActions.userLoginSuccess(value));
    }).catch((reason: {status: number, error: string}) => {
        dispatch(notificationActions.createNotificationWithTimer({notificationMessage: reason.error, notificationType:'warning'}));
        dispatch(userActions.userLoginError(reason.error));
    })
}

export const logout = () => async (dispatch: AppDispatch) =>{
    dispatch(userActions.userLogout());
    await UserService.logout().then(value => {
        dispatch(userActions.userLogoutSuccess());
    }).catch((reason: {status: number, error: string}) => {
        dispatch(notificationActions.createNotification({notificationMessage: reason.error, notificationType:'warning'}));
        dispatch(userActions.userLogoutError(reason.error));
    })
}
export const checkAuth = () => async (dispatch: AppDispatch) =>{
    dispatch(userActions.userLogin());
    await UserService.refreshTokens().then(value => {
        dispatch(userActions.userLoginSuccess(value));
    }).catch((reason: {status: number, error: string}) => {
        //dispatch(notificationActions.createNotification({notificationMessage: reason.error, notificationType:'warning'}));
        dispatch(userActions.userLoginError(reason.error));
    })
}

export const setResponseInterceptor = () => (dispatch: AppDispatch) => {
    const createSetRetryInterceptor = () => async (error: any) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
                originalRequest._isRetry = true;
                await UserService.refreshTokens().then(value => {
                    dispatch(userActions.setAccessToken(value.accessToken));
                    return api.request(originalRequest);
                }).catch((reason: {error: string, status: number}) => {
                    dispatch(notificationActions.createNotification({notificationMessage:reason.error, notificationType:'error'}));
                    dispatch(userActions.userLogoutSuccess());
                });
        }
        if (error.response.status >= 500) {
            dispatch(notificationActions.createNotification({notificationMessage:error.response.data.error, notificationType:'error'}));
        }
        throw error
    }
    const setRetryInterceptor = createSetRetryInterceptor()
    api.interceptors.response.use((config) => {
        return config
    }, setRetryInterceptor);
}

export const loadingAllSessions = () => async (dispatch: AppDispatch) => {
    dispatch(userActions.loadingAllSessions());
    await UserService.getSessions().then(value => {
        dispatch(userActions.loadingAllSessionsSuccess(value));
    }).catch();
}

export const closeAllSessions = () => async (dispatch: AppDispatch) => {
    await UserService.closeAllSession().then(() => {
        dispatch(userActions.closeAllSessions());
        dispatch(notificationActions.createNotificationWithTimer({notificationMessage: 'Sessions has been successful close', notificationType: "info"}));
    }).catch();
}

export const closeSession = (sessionId: number) => async (dispatch: AppDispatch) => {
    await UserService.closeSession(sessionId).then(() => {
        dispatch(userActions.closeSession(sessionId));
        dispatch(notificationActions.createNotificationWithTimer({notificationMessage: 'Sessions has been successful close', notificationType: "info"}));
        dispatch(userActions.closeSessionModalWindow());
    }).catch((reason: {error: string, status: number}) => {
        dispatch(notificationActions.createNotificationWithTimer({notificationMessage: reason.error, notificationType: "info"}));
    })
}