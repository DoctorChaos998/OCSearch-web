import React, {FC} from 'react';
import classes from "./SideBarButton.module.css";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {RouteNames} from "@/entites/routes/routes";

interface ISideBarButtonProps {
    sideBarButtonLink: RouteNames
    onClickSideBarButtonHandler?: () => {}
    sideBarButtonToolTipInscription: string
    sideBarButtonIcon: string
}
const SideBarButton: FC<ISideBarButtonProps> = ({sideBarButtonLink, sideBarButtonToolTipInscription, sideBarButtonIcon, onClickSideBarButtonHandler}) => {
    const pathname = usePathname()
    return (
        <>
            <Link href={sideBarButtonLink} onClick={onClickSideBarButtonHandler} className={classes.button}>
                <span className={`material-icons ${classes.iconColor} ${pathname === sideBarButtonLink? classes.active :classes.unActive}`}>
                    {sideBarButtonIcon}
                </span>
            </Link>
            <span className={classes.tooltip}>
                {sideBarButtonToolTipInscription}
            </span>
        </>
    );
};

export default SideBarButton;