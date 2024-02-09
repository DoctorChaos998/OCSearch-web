'use client'
import React, {useState} from 'react';
import classes from "./UploadingProcess.module.scss";
import {CSSTransition} from "react-transition-group";
import {useAppSelector} from "@/hooks";
const UploadingProcess = () => {
    const [isActive, setIsActive] = useState(false);
    const uploadingProcess = useAppSelector(state => state.uploadingProcessReducer);
    return (
        <CSSTransition timeout={100} in={false} classNames={{
            enterDone: classes.buttonActive
        }} unmountOnExit={true}>
            <button className={classes.button} onClick={() => setIsActive(!isActive)} >
                <span className="material-icons">
                    file_upload
                </span>
                <CSSTransition in={isActive} timeout={{
                    enter: 100,
                    exit: 300
                }} unmountOnExit={true} classNames={{
                    enterDone: classes.containerActive
                }}>
                    <div className={classes.container} onClick={(event) => event.stopPropagation()}>
                        <p className={classes.name}>
                            Sample download process: 50%
                        </p>
                        <div className={classes.loader}>
                            <div className={classes.process} style={{width: 50}}/>
                        </div>
                    </div>
                </CSSTransition>
            </button>
        </CSSTransition>
    );
};

export default UploadingProcess;