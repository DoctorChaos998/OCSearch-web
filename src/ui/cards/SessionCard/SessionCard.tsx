import React, {FC, HTMLAttributes} from 'react';
import {UAParser} from "ua-parser-js";
import classes from "./SessionCard.module.scss";
import {IInactiveSession, ISession, sessionType} from "@/types/sessions";

interface ISessionCard extends HTMLAttributes<HTMLDivElement>{
    session: ISession|IInactiveSession,
    sessionType: sessionType
}
const SessionCard: FC<ISessionCard> = ({session, sessionType, ...props}) => {
    const parser = new UAParser(session.userAgent).getResult();
    return (
        <div className={sessionType==='inactiveSession'?classes.inactiveSessionContainer:sessionType==='activeSession'?classes.activeSessionContainer:classes.currentSessionContainer} {...props}>
            <span className={`material-icons ${sessionType==='inactiveSession'?classes.inactiveSessionIcon:sessionType==='activeSession'?classes.activeSessionIcon:classes.currentSessionIcon}`}>
                {parser.os.name === 'Windows' || parser.os.name === 'Ubuntu' || parser.os.name === 'Linux' || !parser.os.name?'desktop_windows':'phone_android'}
            </span>
            <div className={classes.sessionInfoContainer}>
                {'logoutDate' in session?
                    <span>{`Logout date: ${session.logoutDate}`}</span>
                    :
                    <span>{`Last seen: ${session.lastSeenDate}`}</span>
                }
                <span>{`OS: ${parser.os.name ?? 'Unknown'} ${parser.os.version ?? ''}`}</span>
                <span>{`IP: ${session.ip}`}</span>
                <span>{`Login date: ${session.loginDate}`}</span>
            </div>
        </div>
    );
};

export default SessionCard;