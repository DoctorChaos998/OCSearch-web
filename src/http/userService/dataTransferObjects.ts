import type {inactiveSession, session} from "@/entities/user";

export interface IAuthResponse {
    accessToken: string,
    nickname: string
}
export interface ISessionsInfo{
    currentSession: session,
    otherActiveSessions: session[],
    inactiveSessions: inactiveSession[]
}