import React, {FC, PropsWithChildren, useEffect} from 'react';
import classes from "./ModalWindow.module.scss";
import {createPortal} from "react-dom";
interface IModalWindowProps{
    onModalWindowClickHandler: () => void
}
const ModalWindow: FC<PropsWithChildren<IModalWindowProps>> = ({children, onModalWindowClickHandler}) => {
    const portalRoot = document.getElementById('modalsContainer');
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

    if(!portalRoot) return null;
    return (
        createPortal(
            <div className={classes.modalWindowContainer} onClick={onModalWindowClickHandler}
                 onDragEnter={(event) => event.stopPropagation()}>
                {children}
            </div>, portalRoot
        )
    );
};

export default ModalWindow;