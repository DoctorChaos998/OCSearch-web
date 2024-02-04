'use client'
import React, {useEffect, useRef, useState} from 'react';
import classes from "./RenameModalWindow.module.scss";
import {createPortal} from "react-dom";
import ModalWindow from "@/ui/modals/ModalWindow/ModalWindow";
import {fileSystemActions} from "@/store/slices/fileSystemSlice/fileSystemSlice";
import FileSystemModalWindowButton from "@/ui/buttons/FileSystemModalWindowButton/FileSystemModalWindowButton";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {renameFile, renameFolder} from "@/store/slices/fileSystemSlice/fileSystemActions";

const RenameModalWindow = () => {
    const dispatch = useAppDispatch();
    const renamingModalWindow = useAppSelector(state => state.fileSystemReducer.renameModalWindow);
    const [newItemName, setNewItemName] = useState(renamingModalWindow.initialName);
    const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if(renamingModalWindow.renameItem === 'file'){
            setNewItemName(renamingModalWindow.initialName.slice(0, renamingModalWindow.initialName.lastIndexOf('.')));
        }
        else {
            setNewItemName(renamingModalWindow.initialName);
        }
        if(ref.current){
            setTimeout(() => {
                ref.current?.select();
            },0)
        }
    }, [renamingModalWindow.initialName]);
    const onFormSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(renamingModalWindow.renameItem === 'folder'){
            dispatch(renameFolder(renamingModalWindow.renameItemId, newItemName));
        }
        else {
            dispatch(renameFile(renamingModalWindow.renameItemId, newItemName));
        }
    }
    return (
        renamingModalWindow.isVisible?
            createPortal(<ModalWindow onModalWindowClickHandler={() => dispatch(fileSystemActions.closeRenameModalWindow())}>
                <div className={classes.container} onClick={(event) => event.stopPropagation()}>
                    <form className={classes.form} onSubmit={onFormSubmitHandler}>
                        <h2 className={classes.header}>
                            {`Rename ${renamingModalWindow.renameItem}`}
                        </h2>
                        <label className={`${classes.inputLabel} ${renamingModalWindow.status==='error'?classes.inputLabelError:''}`}>
                            <input value={newItemName} className={classes.input} maxLength={64} ref={ref}
                                   onChange={(event) => {
                                       if(!event.target.value.trim() || event.target.value.length<3 || event.target.value === renamingModalWindow.initialName){
                                           setButtonIsDisabled(true);
                                       }
                                       else {
                                           setButtonIsDisabled(false);
                                       }
                                       setNewItemName(event.target.value);
                                   }}
                                   autoFocus={true}
                            />
                            {renamingModalWindow.renameItem === 'file'&&
                                <div className={classes.fileExtension}>
                                    {renamingModalWindow.initialName.slice(renamingModalWindow.initialName.lastIndexOf('.'))}
                                </div>
                            }
                        </label>
                        <FileSystemModalWindowButton disabled={buttonIsDisabled} label={'Accept'}></FileSystemModalWindowButton>
                    </form>
                </div>
            </ModalWindow>, document.getElementById('modalsContainer')!):null
    );
};

export default RenameModalWindow;