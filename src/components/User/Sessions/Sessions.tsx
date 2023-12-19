'use client'
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/hooks";
import {loadingAllSessions} from "@/store/slices/userSlice/userActions";
import classes from "./Sessions.module.scss";
import SessionsSkeletonLoading from "@/ui/loaders/SessionsSkeletonLoading/SessionsSkeletonLoading";
import SessionCard from "@/ui/cards/SessionCard/SessionCard";
import CloseAllSessionButton from "@/components/User/CloseAllSessionButton/CloseAllSessionButton";
import {userActions} from "@/store/slices/userSlice/userSlice";

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
                <>
                    <h2 className={classes.sessionsTextHeader}>Current session</h2>
                    <SessionsSkeletonLoading></SessionsSkeletonLoading>
                    <h2 className={classes.sessionsTextHeader}>Active sessions</h2>
                    <SessionsSkeletonLoading></SessionsSkeletonLoading>
                    <SessionsSkeletonLoading></SessionsSkeletonLoading>
                    <SessionsSkeletonLoading></SessionsSkeletonLoading>
                    <h2 className={classes.sessionsTextHeader}>Inactive sessions</h2>
                    <SessionsSkeletonLoading></SessionsSkeletonLoading>
                    <SessionsSkeletonLoading></SessionsSkeletonLoading>
                    <SessionsSkeletonLoading></SessionsSkeletonLoading>
                    {/*<button className={classes.buttonChangePassword} onClick={() => setChangePasswordModalIsVisible(true)}>*/}
                    {/*    <span className="material-icons">*/}
                    {/*        manage_accounts*/}
                    {/*    </span>*/}
                    {/*        Change password*/}
                    {/*</button>*/}
                </>
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
                    <button className={classes.buttonChangePassword} onClick={() => dispatch(userActions.openChangePasswordModalWindow())}>
                    <span className="material-icons">
                        manage_accounts
                    </span>
                        Change password
                    </button>
                </>
            }
        </div>
    );
};

export default Sessions;