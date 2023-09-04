import React, {FC, PropsWithChildren} from 'react';
import classes from "./SelectFolderNameModalButton.module.css";
interface ISelectFolderNameModalButtonProps{
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const SelectFolderNameModalButton:FC<PropsWithChildren<ISelectFolderNameModalButtonProps>> = ({children, onClick}) => {
    return (
        <button onClick={onClick} className={classes.selectFolderNameModalButton} type={'submit'}>
            {children}
        </button>
    );
};

export default SelectFolderNameModalButton;