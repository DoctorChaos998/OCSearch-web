'use client'
import React, {useEffect, useRef, useState} from 'react';
import classes from "./RenameModalWindow.module.scss";
import ModalWindow from "@/ui/modals/ModalWindow/ModalWindow";
import {fileSystemActions} from "@/lib/features/fileSystemSlice/fileSystemSlice";
import FileSystemModalWindowButton from "@/ui/buttons/FileSystemModalWindowButton/FileSystemModalWindowButton";
import {renameFile, renameFolder} from "@/lib/features/fileSystemSlice/fileSystemActions";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {clsx} from "clsx";

const RenameModalWindow = () => {
    const dispatch = useAppDispatch();
    const itemRenamingPopup = useAppSelector(state => state.fileSystemReducer.itemRenamingPopup);
    const [newItemName, setNewItemName] = useState(itemRenamingPopup.initialName);
    const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(itemRenamingPopup.renameItem === 'file'){
            setNewItemName(itemRenamingPopup.initialName.slice(0, itemRenamingPopup.initialName.lastIndexOf('.')));
        }
        else {
            setNewItemName(itemRenamingPopup.initialName);
        }
        if(inputRef.current){
            setTimeout(() => {
                inputRef.current?.select();
            },0)
        }
    }, [itemRenamingPopup.initialName]);
    const onFormSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(itemRenamingPopup.renameItem === 'folder'){
            dispatch(renameFolder(itemRenamingPopup.renameItemId, newItemName));
        }
        else {
            dispatch(renameFile(itemRenamingPopup.renameItemId, newItemName));
        }
    }
    return (
        <ModalWindow onModalWindowClickHandler={() => dispatch(fileSystemActions.closeItemRenamingPopup())}>
            <div className={classes.container} onClick={(event) => event.stopPropagation()}>
                <form className={classes.form} onSubmit={onFormSubmitHandler}>
                    <h2 className={classes.header}>
                        {`Rename ${itemRenamingPopup.renameItem}`}
                    </h2>
                    <label className={clsx([classes.inputLabel, itemRenamingPopup.isError && classes.inputLabelError])}>
                        <input value={newItemName} className={classes.input} maxLength={64} ref={inputRef}
                               onChange={(event) => {
                                   setButtonIsDisabled(!event.target.value.trim() || event.target.value.trim().length<3 || event.target.value === itemRenamingPopup.initialName);
                                   setNewItemName(event.target.value);
                               }}
                               autoFocus={true}
                        />
                        {itemRenamingPopup.renameItem === 'file'&&
                            <div className={classes.fileExtension}>
                                {itemRenamingPopup.initialName.slice(itemRenamingPopup.initialName.lastIndexOf('.'))}
                            </div>
                        }
                    </label>
                    <FileSystemModalWindowButton disabled={buttonIsDisabled} label={'Accept'}></FileSystemModalWindowButton>
                </form>
            </div>
        </ModalWindow>
    );
};

export default RenameModalWindow;