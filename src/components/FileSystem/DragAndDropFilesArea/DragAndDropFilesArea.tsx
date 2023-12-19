'use client'
import React, {useEffect, useState} from 'react';
import classes from "./DragAndDropFilesArea.module.scss";
import {createPortal} from "react-dom";
import {useFileContext} from "@/components/FileSystem/FileContext/FileContext";
const DragAndDropFilesArea = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const {selectFilesToUpload} = useFileContext();
    useEffect(() => {
        const ev = (event: DragEvent) => {
            event.preventDefault();
            if(event.dataTransfer?.types.includes('Files')) setIsActive(true);
        }
        window.addEventListener('dragenter', ev);
        return () => {
            window.removeEventListener('dragenter',ev);
            setIsActive(false);
        }
    },[])
    const onDragEnterHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }
    const onDragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsActive(false);
    }
    const onDragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }
    const onDropHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsActive(false);
        selectFilesToUpload(event.dataTransfer.files);
    }
    return (
        isActive?createPortal(
            <div className={classes.container} onDragEnter={onDragEnterHandler} onDragLeave={onDragLeaveHandler} onDrop={onDropHandler} onDragOver={onDragOverHandler}>
                Drop files area
            </div>, document.getElementById('modalsContainer')!):null
    );
};

export default DragAndDropFilesArea;