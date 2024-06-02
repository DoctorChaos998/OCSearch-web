'use client'
import React, {useEffect, useState} from 'react';
import classes from "./Sessions.module.scss";
import SessionsSkeletonLoading from "@/ui/loaders/SessionsSkeletonLoading/SessionsSkeletonLoading";
import SessionCard from "@/ui/cards/SessionCard/SessionCard";
import CloseAllSessionButton from "@/components/User/CloseAllSessionButton/CloseAllSessionButton";
import {userActions} from "@/lib/features/userSlice/userSlice";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {loadingAllSessions} from "@/lib/features/userSlice/userActions";
import ChangePasswordButton from "@/components/User/ChangePasswordButton/ChangePasswordButton";
import SessionsLoader from "@/ui/loaders/SessionsLoader/SessionsLoader";

const Sessions = () => {
    const sessions = useAppSelector(state => state.userReducer.sessions);
    const [lastIndexVisibleInactiveSessions, setLastIndexVisibleInactiveSessions] = useState(5);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(loadingAllSessions());
    }, [])

    return (
        <div className={classes.sessionsContainer}>
            {sessions.isLoading?
                <SessionsLoader/>
                :
                <>
                    <h2 className={classes.sessionsTextHeader}>Current session</h2>
                    <SessionCard session={sessions.sessionsInfo.currentSession} sessionType={'currentSession'} onClick={() => dispatch(userActions.openSessionModalWindow({sessionType: 'currentSession', session: sessions.sessionsInfo.currentSession}))}/>
                    {sessions.sessionsInfo.otherActiveSessions.length>0&&
                        <CloseAllSessionButton/>
                    }
                    {sessions.sessionsInfo.otherActiveSessions.length>0&&<h2 className={classes.sessionsTextHeader}>Active sessions</h2>}
                    {sessions.sessionsInfo.otherActiveSessions.map((value) => <SessionCard session={value} key={value.id} sessionType={'activeSession'} onClick={() => dispatch(userActions.openSessionModalWindow({sessionType: 'activeSession', session: value}))}/>)}
                    {sessions.sessionsInfo.inactiveSessions.length>0&&<h2 className={classes.sessionsTextHeader}>Inactive sessions</h2>}
                    {sessions.sessionsInfo.inactiveSessions.slice(0,lastIndexVisibleInactiveSessions).map((value) => <SessionCard session={value} key={value.id} sessionType={'inactiveSession'} onClick={() => dispatch(userActions.openSessionModalWindow({sessionType: 'inactiveSession', session: value}))}/>)}
                    {sessions.sessionsInfo.inactiveSessions.length>lastIndexVisibleInactiveSessions&&
                        <button className={classes.sessionsButtonShowMore} onClick={() => setLastIndexVisibleInactiveSessions((current) => current+5)}>
                            <span className={`material-icons ${classes.sessionsButtonShowMoreIcon}`}>
                                arrow_downward
                            </span>
                            Show more
                        </button>}
                    <ChangePasswordButton/>
                </>
            }
        </div>
    );
};

export default Sessions;