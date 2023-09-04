'use client'
import React, {FC, PropsWithChildren, useState} from 'react';
import classes from "./SelectFolderNameModal.module.css";
import SelectFolderNameModalButton from "@/ui/buttons/SelectFolderNameModalButton/SelectFolderNameModalButton";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {checkFileName, uploadsFile} from "@/app/(content)/files/Store/FileSystem/FileSystemActions";
import {fileSystemSlice} from "@/app/(content)/files/Store/FileSystem/FileSystemSlise";

interface ISelectFolderNameModalProps{
    files: FileList;
    initialFolderName: string

}
const SelectFolderNameModal:FC<PropsWithChildren<ISelectFolderNameModalProps>> = ({files, initialFolderName}) => {
    const [folderName, setFolderName] = useState(initialFolderName)
    const {inputError, isModalVisible} = useAppSelector(state => state.fileSystemReducer)
    const dispatch = useAppDispatch()
    const submitFormHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        console.log(files)
        dispatch(uploadsFile(files, folderName))
    }
    return (
        isModalVisible &&
            <div className={classes.selectFolderNameModalContainer} onClick={() => {dispatch(fileSystemSlice.actions.setIsModalVisible(false))}}>
                <div className={classes.formContainer} onClick={(event: React.MouseEvent<HTMLDivElement>) => {event.stopPropagation()}}>
                    <form className={classes.form}>
                        <div className={!inputError?classes.inputBox: classes.inputBoxError}>
                            <input value={folderName} onChange={(event) => setFolderName(event.target.value)} className={classes.customFileNameInput} placeholder="File Name" autoFocus={true} onFocus={(event: React.FocusEvent<HTMLInputElement>) => {event.target.select()}}/>
                        </div>
                        <SelectFolderNameModalButton onClick={submitFormHandler}>Ok</SelectFolderNameModalButton>
                    </form>
                </div>
            </div>
    );
};

export default SelectFolderNameModal;