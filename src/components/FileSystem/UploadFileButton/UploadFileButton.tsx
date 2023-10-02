import React, {FC, useRef} from 'react';
import {validFileAccept} from "@/entites/files/validFileExtensions";
import classes from "./UploadFileButton.module.css";
interface IUploadFileButtonProps{
    onFileSelect: (fileList: FileList) => void
}
const UploadFileButton: FC<IUploadFileButtonProps> = ({onFileSelect}) => {
    const filePicker = useRef<HTMLInputElement>(null)
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files !== null)
            onFileSelect(event.target.files)
    }
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(filePicker.current !== null)
            filePicker.current.click()
    }
    return (
        <>
            <button onClick={onClick} className={classes.uploadFileButton}>Upload file
                <span className="material-symbols-outlined">
                    upload
                </span>
            </button>
            <input type={"file"} accept={validFileAccept} multiple={true} ref={filePicker} onChange={onChange} className={classes.uploadFileInputHidden}/>
        </>
    );
};

export default UploadFileButton;