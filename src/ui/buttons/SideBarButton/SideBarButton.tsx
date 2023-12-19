import React, {FC} from 'react';
import classes from "./SideBarButton.module.scss";
import Link, {LinkProps} from "next/link";
import {usePathname} from "next/navigation";

interface ISideBarButtonProps extends LinkProps{
    toolTipInscription: string
    icon: string
}
const SideBarButton: FC<ISideBarButtonProps> = ({icon, toolTipInscription, ...props}) => {
    const pathname = usePathname();
    return (
        <>
            <Link {...props} className={classes.sideBarButton}>
                <span className={`material-icons ${classes.sideBarButtonIcon} ${'/'+pathname.split('/')[1] === props.href? classes.sideBarButtonActive:classes.sideBarButtonUnActive}`}>
                    {icon}
                </span>
            </Link>
            <span className={classes.tooltip}>
                {toolTipInscription}
            </span>
        </>
    );
};

export default SideBarButton;