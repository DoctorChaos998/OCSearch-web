export interface ISession{
    id: number,
    loginDate: string,
    userAgent: string,
    ip: string,
    lastSeenDate: string
}

export interface ISessionsInfo{
    currentSession: ISession,
    otherActiveSessions: ISession[],
    inactiveSessions: IInactiveSession[]
}

export interface IInactiveSession{
    id: number,
    loginDate: string,
    userAgent: string,
    ip: string,
    logoutDate: string
}

export type sessionType = 'currentSession'|'activeSession'|'inactiveSession'