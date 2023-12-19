'use client'
import React, {createRef} from 'react';
import classes from "./Notification.module.scss";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {notificationActions} from "@/store/slices/notificationSlice/notificationSlice";

const Notification = () => {
    const dispatch = useAppDispatch()
    const {notifications} = useAppSelector(state => state.notificationReducer);
    return (
        <div className={classes.notificationContainer}>
            <TransitionGroup className={classes.transitionGroup}>
                {notifications.map((notification) => {
                    const ref = createRef<HTMLDivElement>();
                    return  <CSSTransition nodeRef={ref} key={notification.id}
                                   in={notification.isVisible}
                                   unmountOnExit={true}
                                   timeout={{
                                       appear: 5000,
                                       enter: 5000,
                                       exit:700
                                   }}
                                   classNames={{
                                       enterActive: classes.notificationShow,
                                       enterDone: !notification.withTimer?classes.notificationShow:undefined,
                                   }}
                                   onEntered={() => {
                                       if(notification.withTimer)
                                           dispatch(notificationActions.deleteNotification(notification.id))
                                   }}>
                        <div ref={ref} className={notification.notificationType === 'warning'?classes.notificationWarning:notification.notificationType === 'info'?classes.notificationInfo:classes.notificationError}>
                            <div className={classes.notificationWrapper}>
                            <span className={`material-icons ${classes.notificationIcon}`}>
                                {notification.notificationType}
                            </span>
                                <div className={classes.notificationContent}>
                                    <div title={notification.notificationMessage} className={classes.notificationText}>{notification.notificationMessage}</div>
                                    {notification.withTimer?
                                        <div className={classes.notificationTimerOn}></div>
                                        :<button className={classes.notificationButton} onClick={() => dispatch(notificationActions.deleteNotification(notification.id))}>Ok</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                })}
            </TransitionGroup>
        </div>
    );
};

export default Notification;