'use client'
import React, {FC} from 'react';
import classes from "./SideBar.module.css";
import {useAppDispatch} from "@/store/hooks";
import {RouteNames} from "@/entites/routes/routes";
import SideBarButton from "@/ui/buttons/SidebarButton/SideBarButton";
import {logout} from "@/store/user/ActionCreators";


const SideBar: FC = () => {
    const dispatch = useAppDispatch()
    return (
        <div className={classes.navbarContainer}>
            <aside className={classes.navbarItems}>
                <nav>
                    <ul className={classes.list}>
                        <SideBarButton link={RouteNames.PROFILE} toolTip='Профиль' icon='account_circle'></SideBarButton>
                        <SideBarButton link={RouteNames.SEARCH} toolTip='Поиск' icon='search'></SideBarButton>
                        <SideBarButton link={RouteNames.DATABASES} toolTip='Базы' icon='storage'></SideBarButton>
                    </ul>
                </nav>
                <nav className={classes.bottomNav}>
                    <ul className={classes.list}>
                        <SideBarButton link={RouteNames.LOGIN} toolTip='Выйти' icon='logout' onClick={() => dispatch(logout())}></SideBarButton>
                    </ul>
                </nav>
            </aside>
        </div>
    );
};

export default SideBar;