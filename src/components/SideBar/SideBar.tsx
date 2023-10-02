'use client'
import React, {FC} from 'react';
import classes from "./SideBar.module.css";
import {useAppDispatch} from "@/store/hooks";
import {RouteNames} from "@/entites/routes/routes";
import SideBarButton from "@/ui/buttons/SideBarButton/SideBarButton";
import {logout} from "@/components/AuthModule/UserStore/ActionCreators";


const SideBar: FC = () => {
    const dispatch = useAppDispatch()
    return (
        <div className={classes.sideBarContainer}>
            <aside className={classes.sideBarItems}>
                <nav>
                    <ul className={classes.sideBarItemsList}>
                        <SideBarButton sideBarButtonLink={RouteNames.PROFILE} sideBarButtonToolTipInscription='Profile' sideBarButtonIcon='account_circle'></SideBarButton>
                        <SideBarButton sideBarButtonLink={RouteNames.SEARCH} sideBarButtonToolTipInscription='Search' sideBarButtonIcon='search'></SideBarButton>
                        <SideBarButton sideBarButtonLink={RouteNames.DATABASES} sideBarButtonToolTipInscription='Data bases' sideBarButtonIcon='storage'></SideBarButton>
                        <SideBarButton sideBarButtonLink={RouteNames.FILES} sideBarButtonToolTipInscription={'File browser'} sideBarButtonIcon={'folder_open'}></SideBarButton>
                    </ul>
                </nav>
                <nav className={classes.sideBarBottom}>
                    <ul className={classes.sideBarItemsList}>
                        <SideBarButton sideBarButtonLink={RouteNames.LOGIN} sideBarButtonToolTipInscription='Выйти' sideBarButtonIcon='logout' onClickSideBarButtonHandler={() => dispatch(logout())}></SideBarButton>
                    </ul>
                </nav>
            </aside>
        </div>
    );
};

export default SideBar;