import React, {FC, PropsWithChildren} from 'react';
import classes from "./HeaderButton.module.css";
import Link from "next/link";

interface NavBarButtonProps {
    link: string
    onClick?: () => {}
}
const HeaderButton: FC<PropsWithChildren<NavBarButtonProps>> = ({link, onClick, children}) => {
    return (
        <Link href={link} className={classes.navBarButton} onClick={onClick}>
            {children}
        </Link>
    );
};

export default HeaderButton;