'use client'
import React, {useRef} from 'react';
import classes from "./UploadFileButton.module.scss";
import {useFileContext} from "@/components/FileSystem/FileContext/FileContext";
const UploadFileButton = () => {
    const filePicker = useRef<HTMLInputElement>(null);
    const {selectFilesToUpload} = useFileContext();
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files !== null)
            selectFilesToUpload(event.target.files);
        filePicker.current!.value = '';
    }

    return (
        <>
            <input type={"file"} multiple={true} ref={filePicker} onChange={onChange} className={classes.uploadFileInputHidden} accept={'.csv,.txt,.sql,.xlsx,.zip,.rar,.7z,.tar'}/>
            <button onClick={() => filePicker.current?.click()} className={classes.uploadFileButton}>Upload file
                <span className="material-symbols-outlined">
                    upload
                </span>
            </button>
        </>
    );
};

export default UploadFileButton;