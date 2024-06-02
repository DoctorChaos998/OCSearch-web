import React, {useEffect, useRef, useState} from 'react';
import classes from "./FileSelector.module.scss";
import {CSSTransition} from "react-transition-group";
import {useAppSelector} from "@/lib/hooks";


const FileSelector = () => {
    const [isActive, setIsActive] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const files = useAppSelector(state => state.parsingReducer.preview.files);

    useEffect(() => {
        const closeDropDown = () => {
            setIsActive(false);
        }
        window.addEventListener('click', closeDropDown, false);
        return () => {
            window.removeEventListener('click', closeDropDown, false);
        }
    }, []);
    return (
        <div className={classes.container}>
            <p className={classes.fileName}>513.79525144640-79518407984.csv</p>
            <button className={classes.button} onClick={(event) => {
                event.stopPropagation();
                setIsActive(current => !current);
            }}>
                <span className={`material-icons ${classes.icon} ${isActive?classes.iconRotate:''}`}>
                    expand_more
                </span>
            </button>
            <CSSTransition unmountOnExit={true} nodeRef={ref} in={isActive} timeout={100} classNames={{
                enterDone: classes.fileDropDownIsOpen
            }}>
                <div className={classes.fileDropDownContainer} ref={ref}>
                    {files.map((file) => <div key={file} className={classes.dropDownItem}>
                        {file}
                    </div>)}
                </div>
            </CSSTransition>
        </div>
    );
};

export default FileSelector;