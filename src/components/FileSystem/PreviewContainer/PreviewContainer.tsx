'use client'
import React from 'react';
import {useAppSelector} from "@/hooks";
import PreviewModalWindow from "@/components/FileSystem/PreviewModalWindow/PreviewModalWindow";

const PreviewContainer = () => {
    const isVisible = useAppSelector(state => state.fileSystemReducer.previewModalWindow.isVisible);
    return (
        isVisible?
            <PreviewModalWindow/>
            :
            null
    );
};

export default PreviewContainer;