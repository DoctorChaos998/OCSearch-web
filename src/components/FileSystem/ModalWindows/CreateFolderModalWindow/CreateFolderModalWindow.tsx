'use client'
import React, {useEffect, useRef, useState} from 'react';
import ModalWindow from "@/ui/modals/ModalWindow/ModalWindow";
import {fileSystemActions} from "@/lib/features/fileSystemSlice/fileSystemSlice";
import classes from "./CreateFolderModalWindow.module.scss";
import FileSystemModalWindowButton from "@/ui/buttons/FileSystemModalWindowButton/FileSystemModalWindowButton";
import {useFileContext} from "@/components/FileSystem/FileContext/FileContext";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {clsx} from "clsx";

const CreateFolderModalWindow = () => {
    const dispatch = useAppDispatch();
    const folderCreationPopup = useAppSelector(state => state.fileSystemReducer.folderCreationPopup);
    const [folderName, setFolderName] = useState(folderCreationPopup.initialName);
    const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
    const {uploadFilesInNewFolder} = useFileContext();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setFolderName(folderCreationPopup.initialName);
        setButtonIsDisabled(!folderCreationPopup.initialName.trim() || folderCreationPopup.initialName.trim().length<3)
        if(inputRef.current){
            setTimeout(() => {
                inputRef.current?.select();
            },0);
        }
    }, [folderCreationPopup.initialName]);
    const onFormSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        uploadFilesInNewFolder(folderName.trim());
    }

    return (
        <ModalWindow onModalWindowClickHandler={() => dispatch(fileSystemActions.closeFolderCreationPopup())}>
            <div className={classes.container} onClick={(event) => event.stopPropagation()}>
                <form className={classes.form} onSubmit={onFormSubmitHandler}>
                    <h2 className={classes.header}>
                        Create folder
                    </h2>
                    <label className={clsx([classes.inputLabel, folderCreationPopup.isError && classes.inputLabelError])}>
                        <input value={folderName} className={classes.input} maxLength={64} ref={inputRef}
                               onChange={(event) => {
                                   setButtonIsDisabled(!event.target.value.trim() || event.target.value.trim().length<3);
                                   setFolderName(event.target.value);
                               }}
                            autoFocus={true}
                        />
                    </label>
                    <FileSystemModalWindowButton disabled={buttonIsDisabled} label={'Create folder'}></FileSystemModalWindowButton>
                </form>
            </div>
        </ModalWindow>
    );
};

export default CreateFolderModalWindow;