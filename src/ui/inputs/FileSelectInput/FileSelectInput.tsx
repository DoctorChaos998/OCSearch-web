import React, {FC, PropsWithChildren} from 'react';
import classes from './FileSelectInput.module.css'
interface FileSelectInputProps {
    isMultiple: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    accept: string;
}

const FileSelectInput: FC<PropsWithChildren<FileSelectInputProps>> = ({isMultiple, onChange, accept, children}) => {
    const selectFileId = "selectFileId"
    return (
        <div>
            <label htmlFor={selectFileId} className={classes.selectFileLabel}>{children}</label>
            <input type={"file"} accept={accept} className={classes.selectFileInput} multiple={isMultiple} id={selectFileId} onChange={onChange}/>
        </div>
    );
};

export default FileSelectInput;