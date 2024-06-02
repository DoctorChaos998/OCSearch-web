'use client'
import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import ModalWindow from "@/ui/modals/ModalWindow/ModalWindow";
import classes from "./PreviewModalWindow.module.scss";
import {createPortal} from "react-dom";
import {fileSystemActions} from "@/lib/features/fileSystemSlice/fileSystemSlice";
import FileSystemService from "@/http/fileSystemService";
import {notificationActions} from "@/lib/features/notificationSlice/notificationSlice";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import {useAppDispatch, useAppSelector} from "@/lib/hooks";

const overScan = 0;
const containerHeight = window.innerWidth>767?900:500;
const listItemHeight = 40;
const PreviewModalWindow = () => {
    const [scrollTop, setScrollTop] = useState(0);
    const previousScrollTop = useRef(-1);
    const [isLoading, setIsLoading] = useState<'initial'|'loading'|'success'>('initial');
    const [totalListLength, setTotalListLength] = useState(0);
    const [listToRender, setListToRender] = useState<string[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const fetchIndexes = useRef<{startIndex: number,endIndex: number}>({startIndex: -1, endIndex: -1});
    const dispatch = useAppDispatch();
    const previewModalWindow = useAppSelector(state => state.fileSystemReducer.previewModalWindow);

    useLayoutEffect(() => {
        FileSystemService.getFileRowsNumber(previewModalWindow.fileId).then(value => {
            setTotalListLength(value);
        }).catch((reason: {error: string, status: number}) => {
            dispatch(notificationActions.createNotificationWithTimer({notificationType: "error", notificationMessage: reason.error}));
            dispatch(fileSystemActions.closePreviewModalWindow());
        })
    },[]);

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
        return [startIndex, endIndex, virtualItems];
    },[scrollTop, listToRender, totalListLength])
    const fetchListToRender = async (startIndex: number) => {
        if(isLoading === 'loading') return;
        setIsLoading('loading');
        let computedStartIndex = Math.floor(startIndex/1000) * 1000;
        if(computedStartIndex === fetchIndexes.current.startIndex) computedStartIndex+=1000;
        FileSystemService.getFileRows(previewModalWindow.fileId, computedStartIndex, 1000).then(value => {
            setListToRender(value);
            fetchIndexes.current.startIndex = computedStartIndex;
            fetchIndexes.current.endIndex = computedStartIndex + 1000;
            setIsLoading('success');
            previousScrollTop.current = scrollTop;
        }).catch((reason: {error: string, status: number}) => {
            dispatch(notificationActions.createNotificationWithTimer({notificationType: "error", notificationMessage: reason.error}));
            dispatch(fileSystemActions.closePreviewModalWindow());
        })
    }

    useEffect(() => {
        if((endIndex>fetchIndexes.current.endIndex&&previousScrollTop.current<scrollTop)||
            (startIndex<fetchIndexes.current.startIndex&&previousScrollTop.current>scrollTop)){
            setIsLoading('initial');
            let timer = setTimeout(() => fetchListToRender(startIndex).then(), 1000);
            return () => {
                clearTimeout(timer);
                setIsLoading('success');
            }
        }
    }, [startIndex, endIndex]);

    return (
        <ModalWindow onModalWindowClickHandler={() => dispatch(fileSystemActions.closePreviewModalWindow())}>
            <div className={classes.previewFileModalContainer} ref={scrollContainerRef} onClick={(event) => {
                event.stopPropagation();
            }} onScroll={(event => {
                setScrollTop(event.currentTarget.scrollTop);
            })}>
                {isLoading!=="success" &&
                    <div className={classes.loadingContainer}>
                        {Array(17).fill(true).map((_, index) => <Skeleton
                            key={index}
                            baseColor="#202020"
                            highlightColor="#833ab4"
                            width={'100%'}
                            height={40}
                            borderRadius={40}/>)}
                    </div>
                }
                <div style={{height: totalListLength * listItemHeight}}>
                {virtualItems.map((value) =>{
                    const item: string = value.index>=fetchIndexes.current.endIndex?'Scroll down to load content':
                        value.index<fetchIndexes.current.startIndex?'Scroll up to load content':listToRender[value.index%1000];
                    return <div style={{height: listItemHeight, whiteSpace: 'pre', padding: 12, position: 'absolute', top: 0, transform: `translateY(${value.offsetTop}px)`, width: '100%'}}
                                key={value.index} onClick={(event) => {
                        event.stopPropagation();
                    }}>
                        {item}
                    </div>
                })}
                </div>
            </div>
        </ModalWindow>
    );
};

export default PreviewModalWindow;