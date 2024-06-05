'use client'
import React, {useEffect, useRef, useState} from 'react';
import {CSSTransition} from "react-transition-group";
import classes from "./ParsingButton.module.scss";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {useParams} from "next/navigation";
import {notificationActions} from "@/lib/features/notificationSlice/notificationSlice";

const ParsingButton = () => {
    const [buttonIsVisible, setButtonIsVisible] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const selectedFileSystemItemIds = useAppSelector(state => state.fileSystemReducer.selectedFileSystemItemIds);
    const params = useParams<{folderId: string}>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        setButtonIsVisible(selectedFileSystemItemIds.length === 1 && !params.folderId)
    }, [selectedFileSystemItemIds, params]);

    return (
        <CSSTransition in={buttonIsVisible} nodeRef={buttonRef} timeout={{
            enter:300,
            exit:500
        }} classNames={{
            enterDone:  classes.buttonShow,
        }} unmountOnExit={true}>
            <button onClick={() => {
                dispatch(notificationActions.createNotificationWithTimer({
                    notificationMessage: "Блять, на что ты расчитывал?)",
                    notificationType: 'info'
                }));
            }} className={classes.parsingButton} ref={buttonRef}>
                Parsing
                <span className="material-icons">
                    insert_chart_outlined
                </span>
            </button>
        </CSSTransition>
    );
};

export default ParsingButton;