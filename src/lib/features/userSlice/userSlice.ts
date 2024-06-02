import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {status} from "@/types/slices";
import type {sessionType, ISession, IInactiveSession, ISessionsInfo} from "@/types/sessions";

interface IUserState {
    nickname: string
    status: status,
    isAuth: boolean,
    sessions:{
        sessionsInfo: ISessionsInfo,
        isLoading: boolean
    }
    sessionModalWindow:{
        isVisible: boolean,
        sessionType: sessionType,
        session: ISession|IInactiveSession
    },
}

const initialState: IUserState = {
    nickname: '',
    status: 'initial',
    isAuth: false,
    sessions:{
        sessionsInfo: {} as ISessionsInfo,
        isLoading: true
    },
    sessionModalWindow:{
        isVisible: false,
        sessionType: 'currentSession',
        session: {} as ISession
    },
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        userLoginSuccess(state, action:PayloadAction<{nickname: string}>){
            state.status = 'success';
            state.nickname = action.payload.nickname;
            state.isAuth = true;
        },
        setStatus(state, action: PayloadAction<status>){
            state.status = action.payload;
        },
        userLogoutSuccess(state){
            return {...initialState, status: 'success'};
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
        openSessionModalWindow(state, action: PayloadAction<{sessionType: sessionType, session: ISession|IInactiveSession}>){
            state.sessionModalWindow = {isVisible: true, sessionType: action.payload.sessionType, session: action.payload.session};
        },
        closeSessionModalWindow(state){
            state.sessionModalWindow = {isVisible: false, sessionType: 'currentSession', session: {} as ISession};
        },
        closeSession(state, action: PayloadAction<number>){
            const closeableSession: Omit<ISession, 'lastSeenDate'> = state.sessions.sessionsInfo.otherActiveSessions.find(session => session.id === action.payload)!;
            state.sessions.sessionsInfo.inactiveSessions.unshift({...closeableSession, logoutDate: 'Now'});
            state.sessions.sessionsInfo.otherActiveSessions = state.sessions.sessionsInfo.otherActiveSessions.filter(session => session.id!==action.payload);
        },
    }
})
export const {actions: userActions, reducer: userReducer} = userSlice;
