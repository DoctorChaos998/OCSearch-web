'use client'
import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import ModalWindow from "@/ui/modals/ModalWindow/ModalWindow";
import classes from "./PreviewModalWindow.module.scss";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {createPortal} from "react-dom";
import {fileSystemActions} from "@/store/slices/fileSystemSlice/fileSystemSlice";
import FileSystemService from "@/http/fileSystemService";
import {notificationActions} from "@/store/slices/notificationSlice/notificationSlice";

const overScan = 0;
const containerHeight = 900;
const listItemHeight = 40;
const PreviewModalWindow = () => {
    const [scrollTop, setScrollTop] = useState(0);
    const previousScrollTop = useRef(-1);
    const [isLoading, setIsLoading] = useState(false);
    const [totalListLength, setTotalListLength] = useState(0);
    const [listToRender, setListToRender] = useState<string[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const fetchIndexes = useRef<{startIndex: number,endIndex: number}>({startIndex: -1, endIndex: -1});
    const dispatch = useAppDispatch();
    const previewModalWindow = useAppSelector(state => state.fileSystemReducer.previewModalWindow);

    useLayoutEffect(() => {
        if(previewModalWindow.isVisible){
            FileSystemService.getFileLength(previewModalWindow.fileId).then(value => {
                setTotalListLength(value);
            }).catch((reason: {error: string, status: number}) => {
                dispatch(notificationActions.createNotificationWithTimer({notificationType: "error", notificationMessage: reason.error}));
                dispatch(fileSystemActions.closePreviewModalWindow());
            })
        }
    },[previewModalWindow.isVisible]);

    const [startIndex, endIndex, virtualItems] = useMemo(() => {
        const rangeStart = scrollTop;
        const rangeEnd = scrollTop + containerHeight;
        let startIndex = Math.floor(rangeStart/listItemHeight);
        let endIndex = Math.ceil(rangeEnd/listItemHeight);
        startIndex = Math.max(0, (startIndex - overScan));
        endIndex = Math.min(totalListLength - 1, (endIndex + overScan));
        const virtualItems = [];
        for(let i = startIndex; i<=endIndex;i++){
            virtualItems.push({
                index: i,
                offsetTop: i * listItemHeight
            });
        }
        //console.log(startIndex, endIndex)
        return [startIndex, endIndex, virtualItems];
    },[scrollTop, listToRender, totalListLength])

    const fetchListToRender = async (startIndex: number, endIndex: number) => {
        try {
            if(isLoading) return;
            let computedStartIndex = Math.floor(startIndex/1000) * 1000;
            if(computedStartIndex === fetchIndexes.current.startIndex)
                computedStartIndex+=1000;
            let computedEndIndex = Math.ceil(endIndex/1000) * 1000;
            if(computedEndIndex === fetchIndexes.current.endIndex)
                computedEndIndex-= 1000;
            setIsLoading(true);
            // const response = await api.get<string[]>(`/files`,{
            //     params:{
            //         fileId: previewFileId,
            //         startIndex: computedStartIndex,
            //         endIndex: computedEndIndex,
            //     }
            // });
            //setListToRender(response.data);
            fetchIndexes.current.startIndex = computedStartIndex;
            fetchIndexes.current.endIndex = computedEndIndex;
            setIsLoading(false);
            previousScrollTop.current = scrollTop;
        } catch (error){

        }
    }
    useEffect(() => {
        //console.log(startIndex, endIndex)
        if(endIndex>fetchIndexes.current.endIndex&&previousScrollTop.current<scrollTop){
            console.log(2)
            const timer = setTimeout(() =>fetchListToRender(startIndex, endIndex).then(), 1000);
            return () => clearTimeout(timer);
        }
        else if(startIndex<fetchIndexes.current.startIndex&&previousScrollTop.current>scrollTop){
            console.log(3)
            const timer = setTimeout(() =>fetchListToRender(startIndex, endIndex).then(), 1000);
            return () => clearTimeout(timer);
        }
    }, [startIndex, endIndex, previewModalWindow.fileId]);

    return (
        createPortal(
            <ModalWindow onModalWindowClickHandler={() => dispatch(fileSystemActions.closePreviewModalWindow())}>
                <div className={classes.previewFileModalContainer} ref={scrollContainerRef} onClick={(event) => {
                    event.stopPropagation();
                    // console.log(startIndex, endIndex);
                }} onScroll={(event => {
                    setScrollTop(event.currentTarget.scrollTop);
                })}>
                    <div style={{height: totalListLength * listItemHeight}}>
                        {virtualItems.map((value) =>{
                                let item: string;
                                if(value.index>fetchIndexes.current.endIndex){
                                    item = 'loading';
                                }
                                else if(value.index<fetchIndexes.current.startIndex){
                                    item = 'loading';
                                }
                                else item = listToRender[value.index%1000];
                                return <div style={{height: listItemHeight, padding: 12, position: 'absolute', top: 0, transform: `translateY(${value.offsetTop}px)`, }} key={value.index} onClick={(event) => {event.stopPropagation(); console.log(value.index)}}>
                                    {item}
                                </div>
                            }
                        )}
                    </div>
                </div>
            </ModalWindow>, document.getElementById('modalsContainer')!)
    );
};

export default PreviewModalWindow;