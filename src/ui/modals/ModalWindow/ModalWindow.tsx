import React, {FC, PropsWithChildren, useEffect} from 'react';
import classes from "./ModalWindow.module.scss";
interface IModalWindowProps{
    onModalWindowClickHandler: () => void
}
const ModalWindow: FC<PropsWithChildren<IModalWindowProps>> = ({children, onModalWindowClickHandler}) => {
    useEffect(() => {
        const closeHandler = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onModalWindowClickHandler();
            }
        }
        window.addEventListener('keydown', closeHandler);
        return () => {
            window.removeEventListener('keydown', closeHandler);
        }
    }, []);
    return (
        <div className={classes.modalWindowContainer} onClick={onModalWindowClickHandler}
             onDragEnter={(event) => event.stopPropagation()}>
            {children}
        </div>
    );
};

export default ModalWindow;