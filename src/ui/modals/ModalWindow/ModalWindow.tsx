import React, {FC, PropsWithChildren} from 'react';
import classes from "./ModalWindow.module.scss";
interface IModalWindowProps{
    onModalWindowClickHandler: (event: React.MouseEvent<HTMLDivElement>) => void
}
const ModalWindow: FC<PropsWithChildren<IModalWindowProps>> = ({children, onModalWindowClickHandler}) => {
    return (
        <div className={classes.modalWindowContainer} onClick={onModalWindowClickHandler} onDragEnter={(event) => event.stopPropagation()}>
            {children}
        </div>
    );
};

export default ModalWindow;