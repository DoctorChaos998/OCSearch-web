import {userActions} from "@/lib/features/userSlice/userSlice"
import UserService from "@/http/userService";
import {notificationActions} from "@/lib/features/notificationSlice/notificationSlice";
import {AppDispatch} from "@/lib/store";
import {IApiError} from "@/types/api";

export const checkAuth = () => async (dispatch: AppDispatch) =>{
    await UserService.refreshTokens().then(value => {
        UserService.createRequestInterceptor();
        UserService.createResponseInterceptor(() => {
            dispatch(userActions.userLogoutSuccess());
        });
        dispatch(userActions.userLoginSuccess(value));
    }).catch(() => {
        dispatch(userActions.setStatus('success'));
    });
}
export const loadingAllSessions = () => async (dispatch: AppDispatch) => {
    dispatch(userActions.loadingAllSessions());
    await UserService.getSessions().then(value => {
        dispatch(userActions.loadingAllSessionsSuccess(value));
    }).catch((reason: IApiError) => {
        dispatch(notificationActions.createNotification({notificationMessage: reason.error, notificationType: 'error'}));
    });
}

export const closeAllSessions = () => async (dispatch: AppDispatch) => {
    await UserService.closeAllSession().then(() => {
        dispatch(userActions.closeAllSessions());
        dispatch(notificationActions.createNotificationWithTimer({notificationMessage: 'Sessions have been successfully closed', notificationType: "info"}));
    }).catch((reason: IApiError) => {
        dispatch(notificationActions.createNotification({notificationMessage: reason.error, notificationType: 'error'}));
    });
}

export const closeSession = (sessionId: number) => async (dispatch: AppDispatch) => {
    await UserService.closeSession(sessionId).then(() => {
        dispatch(userActions.closeSession(sessionId));
        dispatch(notificationActions.createNotificationWithTimer({notificationMessage: 'Session has been successfully closed', notificationType: "info"}));
        dispatch(userActions.closeSessionModalWindow());
    }).catch((reason: {error: string, status: number}) => {
        dispatch(notificationActions.createNotificationWithTimer({notificationMessage: reason.error, notificationType: "info"}));
    })
}