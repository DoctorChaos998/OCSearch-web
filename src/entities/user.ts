export interface session{
    id: number,
    loginDate: string,
    userAgent: string,
    ip: string,
    lastSeenDate: string
}

export interface inactiveSession{
    id: number,
    loginDate: string,
    userAgent: string,
    ip: string,
    logoutDate: string
}

export type sessionType = 'currentSession'|'activeSession'|'inactiveSession'