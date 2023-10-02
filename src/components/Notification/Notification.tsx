'use client'
import React from 'react';
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import classes from "./Notification.module.css";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {notificationSlice} from "@/components/Notification/store/NotificationSlice";

const Notification = () => {
    const dispatch = useAppDispatch()
    const {notifications} = useAppSelector(state => state.notificationReducer)
    return (
        <div className={`${classes.notificationContainer}`}>
            <TransitionGroup>
                {notifications.map((notification) =>
                    <CSSTransition key={notification.id}
                                   in={notification.isVisible}
                                   unmountOnExit={true}
                                   timeout={{
                                       appear: 5000,
                                       enter: 5000,
                                       exit:200
                                   }}
                                   classNames={{
                                       enterActive: classes.notificationShow,
                                       enterDone: !notification.withTimer?classes.notificationShow:undefined,
                                   }}
                                   onEntered={() => {
                                       if(notification.withTimer)
                                           dispatch(notificationSlice.actions.deleteNotification(notification.id))
                                   }}>
                        <div className={classes.notification}>
                            {notification.notificationText}
                            {notification.withTimer?
                                <div className={classes.notificationTimerOn}></div>
                                :<button onClick={() => dispatch(notificationSlice.actions.deleteNotification(notification.id))}>Ok</button>
                            }
                        </div>
                    </CSSTransition>)}
            </TransitionGroup>
        </div>
    );
};

export default Notification;