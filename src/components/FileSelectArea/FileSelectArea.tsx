import React, {useRef, useState} from 'react';
import {CSSTransition} from "react-transition-group";
import FileSelectInput from "@/ui/inputs/FileSelectInput/FileSelectInput";
import classes from "./FileSelectArea.module.css";
import {checkFilesExtension} from "@/components/FileSelectArea/helpers";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {fileSystemSlice} from "@/app/(content)/files/Store/FileSystem/FileSystemSlise";
import {uploadsFile} from "@/app/(content)/files/Store/FileSystem/FileSystemActions";
import SelectFolderNameModalButton from "@/ui/buttons/SelectFolderNameModalButton/SelectFolderNameModalButton";
const FileSelectArea = () => {
    const [filesEnterInDropArea, setFilesEnterInDropArea] = useState(false)
    const [errorFilesExtension, setErrorFilesExtension] = useState(false)
    const [currentFolderName, setCurrentFolderName] = useState<string>('')
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const currentFilesToDownload = useRef<FileList>({} as FileList)
    const {inputError} = useAppSelector(state => state.fileSystemReducer)
    const dispatch = useAppDispatch()

    const selectFilesWithInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if(files!=null) {
            if(checkFilesExtension(files)){
                currentFilesToDownload.current = files
                console.log(files[0].name)
                setCurrentFolderName(files[0].name)
                setModalIsVisible(true)
            }
            else {
                setErrorFilesExtension(true)
            }
        }
    }
    const dragEnterHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        setFilesEnterInDropArea(true)
    }
    const dragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        setFilesEnterInDropArea(false)
    }
    const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        setFilesEnterInDropArea(false)
        if(!checkFilesExtension(event.dataTransfer.files)){
            setErrorFilesExtension(true)
        }
        else {
            //dispatch(setDownloadableFiles(event.dataTransfer.files))
            setModalIsVisible(true)
        }
    }
    const submitFormHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        dispatch(uploadsFile(currentFilesToDownload.current, currentFolderName))
    }
    const closeModalHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        currentFilesToDownload.current = {} as FileList
        setModalIsVisible(false)
    }

    return (
        <>
            <div className={classes.dropAreaContainer}>
                <CSSTransition in={errorFilesExtension} timeout={1000} classNames={{
                    enterActive: classes.dropAreaError
                }} onEntered={() => setErrorFilesExtension(false)}>
                    <div className={`${classes.dropArea} ${filesEnterInDropArea? classes.dropAreaActive : ''}`} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDrop={dropHandler} onDragOver={dragEnterHandler}>
                        <span className='material-icons'>
                            download
                        </span>
                        {!filesEnterInDropArea? "Файлы тащить сюда": "Давай я ловлю"}
                    </div>
                </CSSTransition>
                <FileSelectInput isMultiple={true} onChange={selectFilesWithInputHandler} accept={'text/csv'}>Select file</FileSelectInput>
            </div>
            {modalIsVisible &&
            <div className={classes.selectFolderNameModalContainer} onClick={closeModalHandler}>
                <div className={classes.formContainer} onClick={(event: React.MouseEvent<HTMLDivElement>) => {event.stopPropagation()}}>
                    <form className={classes.form}>
                        <div className={!inputError?classes.inputBox: classes.inputBoxError}>
                            <input value={currentFolderName} onChange={(event) => setCurrentFolderName(event.target.value)} className={classes.customFileNameInput} placeholder="File Name" autoFocus={true} onFocus={(event: React.FocusEvent<HTMLInputElement>) => {event.target.select()}}/>
                        </div>
                        <SelectFolderNameModalButton onClick={submitFormHandler}>Ok</SelectFolderNameModalButton>
                    </form>
                </div>
            </div>}
        </>
    );
};

export default FileSelectArea;