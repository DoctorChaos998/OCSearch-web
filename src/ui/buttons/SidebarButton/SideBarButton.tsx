import React, {FC} from 'react';
import classes from "./SideBarButton.module.css";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {RouteNames} from "@/entites/routes/routes";

interface ISideBarButtonProps {
    link: RouteNames
    onClick?: () => {}
    toolTip: string
    icon: string
}
const SideBarButton: FC<ISideBarButtonProps> = ({link,onClick,toolTip,icon}) => {
    const pathname = usePathname()
    return (
        <>
            <Link href={link} onClick={onClick} className={classes.button}>
                <span className={`material-icons ${classes.iconColor} ${pathname === link? classes.active :classes.unActive}`}>
                    {icon}
                </span>
            </Link>
            <span className={classes.tooltip}>
                {toolTip}
        </span>
        </>
    );
};

export default SideBarButton;