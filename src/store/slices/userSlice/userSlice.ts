import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {InternalAxiosRequestConfig} from "axios";
import api from "@/http";
import {type ISessionsInfo} from "@/http/userService/dataTransferObjects";
import type {inactiveSession, session, sessionType} from "@/entities/user";

type status = 'loading'|'error'|'success'|'initial'
const createSetRequestInterceptor = (accessToken:string) => (config:InternalAxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
}

interface IUserState {
    nickname: string
    status: status,
    isAuth: boolean,
    errorText: string,
    accessToken: string
    sessions:{
        sessionsInfo: ISessionsInfo,
        isLoading: boolean
    }
    sessionModalWindow:{
        isVisible: boolean,
        sessionType: sessionType,
        session: session|inactiveSession
    },
    changePasswordModalWindow:{
        isVisible: boolean
    }
}

const initialState: IUserState = {
    nickname: '',
    status: 'initial',
    isAuth: false,
    errorText: '',
    accessToken: '',
    sessions:{
        sessionsInfo: {} as ISessionsInfo,
        isLoading: true
    },
    sessionModalWindow:{
        isVisible: false,
        sessionType: 'currentSession',
        session: {} as session
    },
    changePasswordModalWindow:{
        isVisible: false
    }
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        userLogin(state){
            //state.status = 'loading';
        },
        userLoginSuccess(state, action:PayloadAction<{nickname: string, accessToken: string}>){
            state.status = 'success';
            state.errorText = '';
            state.nickname = action.payload.nickname;
            state.isAuth = true;
            state.accessToken = action.payload.accessToken;
            api.interceptors.request.use(createSetRequestInterceptor(state.accessToken));
        },
        userLoginError(state, action:PayloadAction<string>){
            state.status = 'error';
            state.errorText = action.payload;
        },
        userLogout(state){
            state.status = 'loading';
        },
        userLogoutSuccess(state){
            api.interceptors.response.clear();
            api.interceptors.request.clear();
            return {...initialState, status: 'success'};
        },
        userLogoutError(state, action:PayloadAction<string>){
            state.status = 'error';
            state.errorText = action.payload;
        },
        // userCheckAuth(state){
        //     state.isLoading = true
        // },
        // userCheckAuthSuccess(state, action:PayloadAction<{nickname: string, accessToken: string}>){
        //     state.isLoading = false
        //     state.error = ''
        //     state.user = action.payload.user
        //     state.accessToken = action.payload.accessToken
        //     state.isAuth = true
        //     const setAuthInterceptor = createSetRequestInterceptor(state.accessToken)
        //     api.interceptors.request.use(setAuthInterceptor)
        // },
        // userCheckAuthError(state, action:PayloadAction<string>){
        //     state.isLoading = false
        //     api.interceptors.response.clear()
        //     api.interceptors.request.clear()
        //     state.error = action.payload
        // },
        setAccessToken(state, action: PayloadAction<string>) {
            state.accessToken = action.payload;
            api.interceptors.request.clear();
            api.interceptors.request.use(createSetRequestInterceptor(state.accessToken));
        },
        loadingAllSessions(state){
            state.sessions.isLoading = true;
        },
        loadingAllSessionsSuccess(state, action: PayloadAction<ISessionsInfo>){
            state.sessions.isLoading = false;
            state.sessions.sessionsInfo = action.payload;
        },
        closeAllSessions(state){
            state.sessions.sessionsInfo.inactiveSessions = state.sessions.sessionsInfo.inactiveSessions.concat(state.sessions.sessionsInfo.otherActiveSessions.map(session => ({id: session.id, ip: session.ip, userAgent: session.userAgent, loginDate: session.loginDate, logoutDate: 'Now'})));
            state.sessions.sessionsInfo.otherActiveSessions = [];
        },
        openSessionModalWindow(state, action: PayloadAction<{sessionType: sessionType, session: session|inactiveSession}>){
            state.sessionModalWindow = {isVisible: true, sessionType: action.payload.sessionType, session: action.payload.session};
        },
        closeSessionModalWindow(state){
            state.sessionModalWindow = {isVisible: false, sessionType: 'currentSession', session: {} as session};
        },
        closeSession(state, action: PayloadAction<number>){
            const closeableSession = state.sessions.sessionsInfo.otherActiveSessions.find(session => session.id= action.payload)!;
            state.sessions.sessionsInfo.inactiveSessions.push({id: closeableSession.id, ip: closeableSession.ip, userAgent: closeableSession.userAgent, loginDate: closeableSession.loginDate, logoutDate: 'Now'});
            state.sessions.sessionsInfo.otherActiveSessions = state.sessions.sessionsInfo.otherActiveSessions.filter(session => session.id!==action.payload);
        },
        openChangePasswordModalWindow(state){
            state.changePasswordModalWindow.isVisible = true;
        },
        closeChangePasswordModalWindow(state){
            state.changePasswordModalWindow.isVisible = false;
        }
    }
})
export const {actions: userActions, reducer: userReducer} = userSlice;
