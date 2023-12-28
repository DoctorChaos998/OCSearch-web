import React, {FC, useMemo, useRef, useState} from 'react';
import {type IFile} from "@/entities/fileSystem";
import classes from "./FileSystemFile.module.scss";
import {useAppSelector} from "@/hooks";
import {CSSTransition} from "react-transition-group";

interface IFileSystemFileProps{
    file: IFile,
    onClickHandler: (event: React.MouseEvent<HTMLDivElement>, fileId: number, fileIndex: number) => void,
    onDoubleClickHandler: () => void,
    index: number
}
const FileSystemFile: FC<IFileSystemFileProps> = ({file, onClickHandler, onDoubleClickHandler, index}) => {
    const [infoIsVisible, setInfoIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [mousePosition, setMousePosition] = useState({ top: 0, left: 0 });
    const selectedFileIds = useAppSelector(state => state.fileSystemReducer.selectedFileSystemItemIds);
    const ref = useRef<HTMLSpanElement>(null);

    const fileSize: string = useMemo(() => {
        if(file.size === null) return 'Undefined';
        if(file.size<1024) return file.size + " B";
        else if(file.size<1024*1024) return (file.size/1024).toFixed(2) + " KB";
        else if(file.size<1024*1024*1024) return (file.size/1024/1024).toFixed(2) + " MB";
        return (file.size/1024/1024/1024).toFixed(2) + " GB";
    }, [file.size])
    const onMouseEnterHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        setInfoIsVisible(true);
        setMousePosition({
            top: event.clientY,
            left: event.clientX
        });
    }
    const computePosition = () =>{
        const rect = ref.current?.getBoundingClientRect();
        if(rect){
            setPosition({
                top: window.innerHeight - mousePosition.top<rect.height?window.innerHeight-rect.height-5:mousePosition.top,
                left: window.innerWidth - mousePosition.left<rect.width?window.innerWidth-rect.width-20:mousePosition.left
            });
        }
    }
    return (
        <div onDoubleClick={onDoubleClickHandler} onMouseEnter={onMouseEnterHandler} onMouseLeave={() => setInfoIsVisible(false)}
             className={`${classes.container} ${selectedFileIds.findIndex((id) => file.id === id)!==-1? classes.containerActive: ''}`}
             onClick={(event) => onClickHandler(event, file.id, index)}>
                <span className={`material-icons ${classes.fileIcon}`}>
                    contact_page
                </span>
            <p className={classes.fileName}>{file.name}</p>
            <CSSTransition nodeRef={ref} onEnter={computePosition} in={infoIsVisible} timeout={{
                enter: 1000,
                exit: 300
            }} classNames={{
                enterDone: classes.fileTooltipActive
            }} unmountOnExit={true}>
                <span className={classes.fileTooltip} style={{top: position.top, left: position.left}} ref={ref}>
                    {`Name: ${file.name}`}
                    <br/>
                    {`Uploaded by: ${file.uploadedBy}`}
                    <br/>
                    {`Upload date: ${file.uploadDate ?? 'Undefined'}`}
                    <br/>
                    {`Size: ${fileSize}`}
                    <br/>
                    {`Status: ${file.status}`}
                </span>
            </CSSTransition>
        </div>
    );
};

export default FileSystemFile;