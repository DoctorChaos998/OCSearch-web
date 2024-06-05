'use client'
import React from 'react';
import ModalWindow from "@/ui/modals/ModalWindow/ModalWindow";
import classes from "./PreviewModalWindow.module.scss";
import {fileSystemActions} from "@/lib/features/fileSystemSlice/fileSystemSlice";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import {useFilePreview} from "@/hooks/FileSystem/filePreview";
import {useAppDispatch} from "@/lib/hooks";

const containerHeight = window.innerWidth>767?900:500;
const listItemHeight = 40;
const PreviewModalWindow = () => {
    const {setScrollTop, isLoading,
        rowsNumber, virtualRowIdsToRender,
        fetchedStartIndex, fetchedEndIndex,
        rowsToRender} = useFilePreview(containerHeight, listItemHeight);
    const dispatch = useAppDispatch();

    return (
        <ModalWindow onModalWindowClickHandler={() => dispatch(fileSystemActions.closePreviewPopup())}>
            <div className={classes.previewFileModalContainer} onClick={(event) => {
                event.stopPropagation();
            }} onScroll={(event => {
                setScrollTop(event.currentTarget.scrollTop);
            })}>
                {isLoading &&
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
                <div style={{height: (rowsNumber * listItemHeight)>900&&isLoading?(rowsNumber * listItemHeight)-900:rowsNumber * listItemHeight}}>
                    {virtualRowIdsToRender.map((id) =>{
                        const item: string = id >= fetchedEndIndex.current?'Scroll down to load content':
                            id < fetchedStartIndex.current?'Scroll up to load content':rowsToRender[id%1000];
                        return <div style={{height: listItemHeight, whiteSpace: 'pre', padding: 12, position: 'absolute', top: 0, transform: `translateY(${id * listItemHeight}px)`, width: '100%'}}
                                    key={id} onClick={(event) => {
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