import React, {FC} from 'react';
import classes from "./FileSystemModalWindowButton.module.scss";
interface ISelectFolderNameModalButtonProps{
    disabled: boolean,
    label: string
}

const FileSystemModalWindowButton:FC<ISelectFolderNameModalButtonProps> = ({disabled, label}) => {
    return (
        <button className={disabled?classes.buttonIsDisabled:classes.button} type={'submit'} disabled={disabled}>
            {label}
        </button>
    );
};

export default FileSystemModalWindowButton;