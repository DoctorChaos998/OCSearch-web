import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {fileStatusDisplayName, IFile, keyForSelect} from "@/entities/fileSystem";
import classes from "./FileSystemFile.module.scss";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {CSSTransition} from "react-transition-group";
import {fileSystemActions} from "@/store/slices/fileSystemSlice/fileSystemSlice";
import {fileSizeToString} from "@/helpers/fileSystemHelper";
interface IFileSystemFileProps{
    file: IFile,
    onClickHandler: (keyForSelect: keyForSelect, fileId: number, fileIndex: number) => void,
    onDoubleClickHandler: () => void,
    index: number
}
const FileSystemFile: FC<IFileSystemFileProps> = ({file, onClickHandler, onDoubleClickHandler, index}) => {
    const [infoIsVisible, setInfoIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [mousePosition, setMousePosition] = useState({ top: 0, left: 0 });
    const [isScroll, setIsScroll] = useState<boolean>(false);
    const [touchDebounce, setTouchDebounce] = useState(false);
    const [firstSelect, setFirstSelect] = useState<boolean>(true);
    const selectedFileIds = useAppSelector(state => state.fileSystemReducer.selectedFileSystemItemIds);
    const isActive = useAppSelector(state => state.fileSystemReducer.mobileHelper.isActive);
    const ref = useRef<HTMLSpanElement>(null);
    const dispatch = useAppDispatch();

    const fileSize: string = useMemo(() => {
        return fileSizeToString(file.size);
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

    useEffect(() => {
        const timer = setTimeout(() => {
            if(touchDebounce && !isScroll){
                dispatch(fileSystemActions.openMobileHelper());
                onClickHandler(null, file.id, index);
                setFirstSelect(false);
            }
        }, 700)
        return () => clearTimeout(timer);
    }, [touchDebounce]);

    return (
        <div onDoubleClick={onDoubleClickHandler} onMouseEnter={onMouseEnterHandler} onMouseLeave={() => setInfoIsVisible(false)}
             className={`${classes.container} ${selectedFileIds.findIndex((id) => file.id === id)!==-1? classes.containerActive: ''}`}
             onClick={(event) => {
                 event.stopPropagation();
                 if(window.innerWidth > 767) {
                     const keyForSelect: keyForSelect = event.shiftKey?'shift':event.ctrlKey?'ctrl':null;
                     onClickHandler(keyForSelect, file.id, index);
                 }
             }}
             onTouchStart={() => {
                 setTouchDebounce(true);
             }}
             onScroll={(event) => event.stopPropagation()}
             onTouchMove={(event) => {
                 setIsScroll(true);
                 setTouchDebounce(false);
                 event.stopPropagation();
             }}
             onTouchEnd={() => {
                 setTouchDebounce(false);
                 if(isScroll) setIsScroll(false)
                 else {
                     if (isActive) {
                         if(firstSelect) {
                             onClickHandler(null, file.id, index);
                         }
                     }
                     else onDoubleClickHandler()
                     setFirstSelect(true);
                 }
             }}>
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
                    {`Status: ${fileStatusDisplayName[file.status]}`}
                </span>
            </CSSTransition>
        </div>
    );
};

export default FileSystemFile;