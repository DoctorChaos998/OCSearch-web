import React, {useRef, useState} from "react";

export const useFileSystemItemTooltip = () => {
    const [tooltipIsVisible, setTooltipIsVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const [mousePosition, setMousePosition] = useState({ top: 0, left: 0 });
    const tooltipRef = useRef<HTMLSpanElement>(null);
    const mouseEnterHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        setTooltipIsVisible(true);
        setMousePosition({
            top: event.clientY,
            left: event.clientX
        });
    }
    const computeTooltipPosition = () =>{
        const rect = tooltipRef.current?.getBoundingClientRect();
        if(rect){
            setTooltipPosition({
                top: window.innerHeight - mousePosition.top<rect.height?window.innerHeight-rect.height-5:mousePosition.top,
                left: window.innerWidth - mousePosition.left<rect.width?window.innerWidth-rect.width-20:mousePosition.left
            });
        }
    }
    return {tooltipIsVisible, tooltipRef, tooltipPosition, mouseEnterHandler, computeTooltipPosition, hideTooltip: () => setTooltipIsVisible(false)};
}