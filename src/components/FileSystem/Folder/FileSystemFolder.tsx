import React, {FC, useEffect, useRef, useState} from 'react';
import {IFolder} from "@/entities/fileSystem";
import {useAppDispatch, useAppSelector} from "@/hooks";
import classes from "./FileSystemFolder.module.scss";
import {CSSTransition} from "react-transition-group";
import {fileSystemActions} from "@/store/slices/fileSystemSlice/fileSystemSlice";

interface IFileSystemFolder{
    folder: IFolder
    onClickHandler: (event: React.MouseEvent<HTMLDivElement>|React.TouchEvent<HTMLDivElement>, fileId: number, fileIndex: number) => void,
    onDoubleClickHandler: () => void,
    index: number
}
const FileSystemFolder: FC<IFileSystemFolder> = ({folder, onClickHandler, onDoubleClickHandler, index}) => {
    const [infoIsVisible, setInfoIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [mousePosition, setMousePosition] = useState({ top: 0, left: 0 });
    const selectedFileIds = useAppSelector(state => state.fileSystemReducer.selectedFileSystemItemIds);
    const ref = useRef<HTMLSpanElement>(null);
    const [touchDebounce, setTouchDebounce] = useState(false);
    const dispatch = useAppDispatch();
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
            if(touchDebounce){
                dispatch(fileSystemActions.openMobileHelper());
            }
        }, 700)
        return () => clearTimeout(timer);
    }, [touchDebounce]);

    return (
        <div onDoubleClick={onDoubleClickHandler}
             className={`${classes.container} ${selectedFileIds.findIndex((id) => folder.id === id)!==-1? classes.containerActive: ''}`}
             onClick={(event) => {
                 event.stopPropagation();
                 if(window.innerWidth > 767) {
                 onClickHandler(event, folder.id, index);
             }}}
             onTouchStart={(event) => {
                 setTouchDebounce(true);
                 onClickHandler(event, folder.id, index);
             }}
             onTouchEnd={() => setTouchDebounce(false)}
             onMouseEnter={onMouseEnterHandler}
             onMouseLeave={() => setInfoIsVisible(false)}>
                <span className={`material-icons ${classes.folderIcon}`}>
                    folder
                </span>
            <p className={classes.folderName}>{folder.name}</p>
            <CSSTransition nodeRef={ref}
                           onEnter={computePosition}
                           in={infoIsVisible}
                           timeout={{
                                enter: 1000,
                                exit: 300
            }} classNames={{
                enterDone: classes.folderTooltipActive
            }} unmountOnExit={true}>
                <span className={classes.folderTooltip} style={{top: position.top, left: position.left}} ref={ref}>
                    {`Name: ${folder.name}`}
                    <br/>
                    {`Created by: ${folder.createdBy}`}
                    <br/>
                    {`Upload date: ${folder.lastUploadDate ?? 'Undefined'}`}
                    <br/>
                    {`Files number: ${folder.filesNumber}`}
                </span>
            </CSSTransition>
        </div>
    );
};

export default FileSystemFolder;