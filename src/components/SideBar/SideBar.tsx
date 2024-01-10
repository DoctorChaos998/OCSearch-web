'use client'
import React, {FC} from 'react';
import classes from "./SideBar.module.scss";
import {useAppDispatch} from "@/hooks";
import SideBarButton from "@/ui/buttons/SideBarButton/SideBarButton";
import {logout} from "@/store/slices/userSlice/userActions";


const SideBar: FC = () => {
    const dispatch = useAppDispatch();
    return (
        <aside className={classes.sideBarContainer}>
            <nav>
                <ul className={classes.sideBarItemsList}>
                    <SideBarButton href={'/profile'} toolTipInscription='Profile' icon='account_circle'/>
                    <SideBarButton href={'/search'} toolTipInscription='Search' icon='search'/>
                    <SideBarButton href={'/databases'} toolTipInscription='Data bases' icon='storage'/>
                    <SideBarButton href={'/folders'} toolTipInscription='File browser' icon='folder_open'/>
                </ul>
            </nav>
            <nav className={classes.sideBarBottom}>
                <ul className={classes.sideBarItemsList}>
                    <SideBarButton href={'/login'} toolTipInscription='Logout' icon='logout' onClick={() => dispatch(logout())}/>
                </ul>
            </nav>
        </aside>
    );
};

export default SideBar;