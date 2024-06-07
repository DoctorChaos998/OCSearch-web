'use client'
import React, {useState} from 'react';
import classes from "./UploadingProcess.module.scss";
import {CSSTransition} from "react-transition-group";
import {uploadingProcessActions} from "@/lib/features/uploadingProcessSlice/uploadingProcessSlice";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";

const UploadingProcess = () => {
    const [isActive, setIsActive] = useState(false);
    const uploadingProcess = useAppSelector(state => state.uploadingProcessReducer);
    const dispatch = useAppDispatch();

    return (
        <CSSTransition timeout={200} in={uploadingProcess.isActive} classNames={{
            enterDone: classes.mainContainerActive
        }} unmountOnExit={true}>
            <div className={classes.mainContainer}>
                <button className={classes.button} onClick={() => {
                    if (isActive) {
                        dispatch(uploadingProcessActions.trySetInactive());
                    }
                    setIsActive(!isActive);
                }}>
                    <span className="material-icons">
                        file_upload
                    </span>
                </button>
                <CSSTransition in={isActive} timeout={{
                    enter: 100,
                    exit: 300
                }} unmountOnExit={true} classNames={{
                    enterDone: classes.uploadingListContainerActive
                }}>
                    <div className={classes.uploadingListContainer} onClick={(event) => event.stopPropagation()}>
                        {uploadingProcess.uploadingList.map(uploading => <div key={uploading.id}
                                                                              className={classes.uploadingContainer}>
                            <span className={`material-symbols-outlined ${classes.icon}`}>
                                note_stack
                            </span>
                            <div className={classes.uploadInfoContainer}>
                                <span className={classes.text} title={uploading.firstFileName}>
                                    {uploading.firstFileName}
                                </span>
                                <span>
                                    {uploading.uploadingSize}
                                </span>
                                <span>
                                    {`Files number: ${uploading.filesNumber}`}
                                </span>
                            </div>
                            <span className={classes.icon}>
                                {uploading.progress}%
                            </span>
                            <div className={classes.process} style={{
                                width: `${uploading.progress}%`, background: `${uploading.status === 'loading' ?
                                    'deepskyblue' : uploading.status === 'success' ? 'forestgreen' : 'firebrick'}`
                            }}/>
                        </div>)}
                    </div>
                </CSSTransition>
            </div>
        </CSSTransition>
    );
};

export default UploadingProcess;