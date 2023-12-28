'use client'
import React, {useEffect, useRef, useState} from 'react';
import ModalWindow from "@/ui/modals/ModalWindow/ModalWindow";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {createPortal} from "react-dom";
import {fileSystemActions} from "@/store/slices/fileSystemSlice/fileSystemSlice";
import classes from "./CreateFolderModalWindow.module.scss";
import FileSystemModalWindowButton from "@/ui/buttons/FileSystemModalWindowButton/FileSystemModalWindowButton";
import {useFileContext} from "@/components/FileSystem/FileContext/FileContext";

const CreateFolderModalWindow = () => {
    const dispatch = useAppDispatch();
    const createFolderModalWindow = useAppSelector(state => state.fileSystemReducer.createFolderModalWindow);
    const [folderName, setFolderName] = useState(createFolderModalWindow.initialName);
    const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
    const {uploadFilesInNewFolder} = useFileContext();
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
        setFolderName(createFolderModalWindow.initialName);
        if(!createFolderModalWindow.initialName.trim() || createFolderModalWindow.initialName.trim().length<3){
            setButtonIsDisabled(true);
        }
        else {
            setButtonIsDisabled(false);
        }
        if(ref.current){
            setTimeout(() => {
                ref.current?.select();
            },0);
        }
    }, [createFolderModalWindow.initialName]);
    const onFormSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        uploadFilesInNewFolder(folderName.trim());
    }
    return (
        createFolderModalWindow.isVisible?
            createPortal(<ModalWindow onModalWindowClickHandler={() => dispatch(fileSystemActions.closeCreateFolderModalWindow())}>
                <div className={classes.container} onClick={(event) => event.stopPropagation()}>
                    <form className={classes.form} onSubmit={onFormSubmitHandler}>
                        <h2 className={classes.header}>
                            Create folder
                        </h2>
                        <label className={`${classes.inputLabel} ${createFolderModalWindow.status==='error'?classes.inputLabelError:''}`}>
                            <input value={folderName} className={classes.input} maxLength={64} ref={ref}
                                   onChange={(event) => {
                                       if(!event.target.value.trim() || event.target.value.trim().length<3){
                                           setButtonIsDisabled(true);
                                       }
                                       else {
                                           setButtonIsDisabled(false);
                                       }
                                       setFolderName(event.target.value);
                                   }}
                                autoFocus={true} onFocus={(event: React.FocusEvent<HTMLInputElement>) => {event.target.select()}}
                            />
                        </label>
                        <FileSystemModalWindowButton disabled={buttonIsDisabled} label={'Create folder'}></FileSystemModalWindowButton>
                    </form>
                </div>
            </ModalWindow>, document.getElementById('modalsContainer')!):null
    );
};

export default CreateFolderModalWindow;