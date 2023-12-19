'use client'
import React from 'react';
import ModalWindow from "@/ui/modals/ModalWindow/ModalWindow";
import classes from "./SessionInfoModal.module.scss";
import {UAParser} from "ua-parser-js";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {createPortal} from "react-dom";
import {userActions} from "@/store/slices/userSlice/userSlice";
import {closeSession} from "@/store/slices/userSlice/userActions";
const SessionInfoModal = () => {
    const sessionModalWindow = useAppSelector(state => state.userReducer.sessionModalWindow);
    const dispatch = useAppDispatch();
    const userAgentParsed = new UAParser(sessionModalWindow.session.userAgent).getResult();
    return (
        sessionModalWindow.isVisible?
            createPortal(
                <ModalWindow onModalWindowClickHandler={() => dispatch(userActions.closeSessionModalWindow())}>
                    <div className={classes.sessionInfoContainer} onClick={(event) => event.stopPropagation()}>
                        <span className={`material-icons ${classes.sessionInfoIcon}`}>
                            {userAgentParsed.os.name === 'Windows' || userAgentParsed.os.name === 'Ubuntu'?'desktop_windows':'phone_android'}
                        </span>
                        {sessionModalWindow.sessionType === 'inactiveSession'?
                            <span>{`Logout date: ${"logoutDate" in sessionModalWindow.session ? sessionModalWindow.session.logoutDate :''}`}</span>:
                            <span>{`Last seen: ${"lastSeen" in sessionModalWindow.session ? sessionModalWindow.session.lastSeen:''}`}</span>
                        }
                        {userAgentParsed.device.vendor&&<span>{`Device: ${userAgentParsed.device.type} ${userAgentParsed.device.model} ${userAgentParsed.device.vendor}`}</span>}
                        <hr className={classes.sessionInfoLine}/>
                        <span>{`OS: ${userAgentParsed.os.name} ${userAgentParsed.os.version}`}</span>
                        <span>{`Browser: ${userAgentParsed.browser.name} ${userAgentParsed.browser.version}`}</span>
                        <span>{`IP: ${sessionModalWindow.session.ip}`}</span>
                        <span>{`Login date: ${sessionModalWindow.session.loginDate}`}</span>
                        <hr className={classes.sessionInfoLine}/>
                        {sessionModalWindow.sessionType === 'currentSession'?
                            <span>
                                Current session
                            </span>:
                            sessionModalWindow.sessionType === 'inactiveSession'?
                            <span>
                                Closed session
                            </span>:
                        <button className={classes.sessionInfoButton} onClick={() => {
                            if('lastSeen' in sessionModalWindow.session){
                                dispatch(closeSession(sessionModalWindow.session.id));
                            }
                        }}>
                            Close session
                        </button>}
                    </div>
        </ModalWindow>, document.getElementById('modalsContainer')!):null
    );
};

export default SessionInfoModal;