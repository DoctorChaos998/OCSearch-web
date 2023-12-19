export interface session{
    id: number,
    loginDate: string,
    userAgent: string,
    ip: string,
    lastSeen: string
}

export interface inactiveSession{
    id: number,
    loginDate: string,
    userAgent: string,
    ip: string,
    logoutDate: string
}

export type sessionType = 'currentSession'|'activeSession'|'inactiveSession'