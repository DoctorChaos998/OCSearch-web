import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {fileSystemActions} from "@/lib/features/fileSystemSlice/fileSystemSlice";

export const useFileSystemItemSelect = (clickHandler: () => void, doubleClickHandler: () => void) => {
    const [isScroll, setIsScroll] = useState<boolean>(false);
    const [touchDebounce, setTouchDebounce] = useState(false);
    const [firstSelect, setFirstSelect] = useState<boolean>(true);
    const isActive = useAppSelector(state => state.fileSystemReducer.mobileHelper.isActive);
    const dispatch = useAppDispatch();

    const touchStartHandler = () => {
        setTouchDebounce(true);
    }
    const touchMoveHandler = (event: React.TouchEvent<HTMLDivElement>) => {
        setIsScroll(true);
        setTouchDebounce(false);
        event.stopPropagation();
    }
    const touchEndHandler = () => {
        setTouchDebounce(false);
        if(isScroll) setIsScroll(false)
        else {
            if (isActive) {
                if(firstSelect) {
                    clickHandler();
                }
            }
            else doubleClickHandler();
            setFirstSelect(true);
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if(touchDebounce){
                dispatch(fileSystemActions.openMobileHelper());
                clickHandler();
                setFirstSelect(false);
            }
        }, 700)
        return () => clearTimeout(timer);
    }, [touchDebounce]);

    return {touchStartHandler, touchMoveHandler, touchEndHandler};
}