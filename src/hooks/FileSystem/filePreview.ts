import {useEffect, useMemo, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import FileSystemService from "@/http/fileSystemService";
import {notificationActions} from "@/lib/features/notificationSlice/notificationSlice";
import {fileSystemActions} from "@/lib/features/fileSystemSlice/fileSystemSlice";
import {IApiError} from "@/types/api";

export const useFilePreview = (containerHeight: number, listItemHeight: number) => {
    const previewPopup = useAppSelector(state => state.fileSystemReducer.previewPopup);
    const [scrollTop, setScrollTop] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [rowsNumber, setRowsNumber] = useState(0);
    const [rowsToRender, setRowsToRender] = useState<string[]>([]);
    const fetchedStartIndex = useRef(-1);
    const fetchedEndIndex = useRef(-1);
    const previousScrollTop = useRef(-1);
    const isFetching = useRef(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        FileSystemService.getFileRowsNumber(previewPopup.fileId).then(value => {
            setRowsNumber(value);
        }).catch((reason: IApiError) => {
            dispatch(notificationActions.createNotificationWithTimer({notificationType: "error", notificationMessage: reason.error}));
            dispatch(fileSystemActions.closePreviewPopup());
        })
    },[]);

    const [startIndex, endIndex, virtualRowIdsToRender] = (() => {
        const rangeStart = scrollTop;
        const rangeEnd = scrollTop + containerHeight;
        let startIndex = Math.floor(rangeStart/listItemHeight);
        let endIndex = Math.ceil(rangeEnd/listItemHeight);
        startIndex = Math.max(0, startIndex);
        endIndex = Math.min(rowsNumber - 1, endIndex);
        const virtualRowIdsToRender = [];
        for(let i = startIndex; i<= endIndex;i++){
            virtualRowIdsToRender.push(i);
        }
        return [startIndex, endIndex, virtualRowIdsToRender];
    })();

    const fetchListToRender = (startIndex: number) => {
        let computedStartIndex = Math.floor(startIndex/1000) * 1000;
        if(computedStartIndex === fetchedStartIndex.current) computedStartIndex+=1000;
        FileSystemService.getFileRows(previewPopup.fileId, computedStartIndex, 1000).then(value => {
            setRowsToRender(value);
            fetchedStartIndex.current = computedStartIndex;
            fetchedEndIndex.current = computedStartIndex + 1000;
            setIsLoading(false);
            previousScrollTop.current = scrollTop;
            isFetching.current = false;
        }).catch((reason: IApiError) => {
            dispatch(notificationActions.createNotificationWithTimer({notificationType: "error", notificationMessage: reason.error}));
            dispatch(fileSystemActions.closePreviewPopup());
        })
    }

    useEffect(() => {
        if((endIndex>fetchedEndIndex.current && previousScrollTop.current<scrollTop)||
            (startIndex<fetchedStartIndex.current && previousScrollTop.current>scrollTop)){
            setIsLoading(true);
            let timer = setTimeout(() => {
                if(isFetching.current) return;
                isFetching.current = true;
                fetchListToRender(startIndex);
            }, 1000);
            return () => {
                clearTimeout(timer);
                setIsLoading(false);
            }
        }
    }, [startIndex, endIndex]);

    return {setScrollTop, isLoading, rowsNumber, virtualRowIdsToRender, fetchedStartIndex, fetchedEndIndex, rowsToRender};
}