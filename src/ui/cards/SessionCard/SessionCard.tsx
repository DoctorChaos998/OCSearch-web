import React, {FC, HTMLAttributes} from 'react';
import type {inactiveSession, session, sessionType} from "@/entities/user";
import {UAParser} from "ua-parser-js";
import classes from "./SessionCard.module.scss";
interface ISessionCard extends HTMLAttributes<HTMLDivElement>{
    session: session|inactiveSession,
    sessionType: sessionType
}
const SessionCard: FC<ISessionCard> = ({session, sessionType, ...props}) => {
    const parser = new UAParser(session.userAgent);
    return (
        <div className={sessionType==='inactiveSession'?classes.inactiveSessionContainer:sessionType==='activeSession'?classes.activeSessionContainer:classes.currentSessionContainer} {...props}>
            <span className={`material-icons ${sessionType==='inactiveSession'?classes.inactiveSessionIcon:sessionType==='activeSession'?classes.activeSessionIcon:classes.currentSessionIcon}`}>
                {parser.getOS().name === 'Windows' || parser.getOS().name === 'Ubuntu'?'desktop_windows':'phone_android'}
            </span>
            <div className={classes.sessionInfoContainer}>
                {'logoutDate' in session?
                    <span>{`Logout date: ${session.logoutDate}`}</span>
                    :
                    <span>{`Last seen: ${session.lastSeen}`}</span>
                }
                <span>{`OS: ${parser.getOS().name} ${parser.getOS().version}`}</span>
                <span>{`IP: ${session.ip}`}</span>
                <span>{`Login date: ${session.loginDate}`}</span>
            </div>
        </div>
    );
};

export default SessionCard;