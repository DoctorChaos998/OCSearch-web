'use client'
import React, {FC} from 'react';
import classes from "./SideBar.module.scss";
import SideBarButton from "@/ui/buttons/SideBarButton/SideBarButton";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import UserService from "@/http/userService";
import {userActions} from "@/lib/features/userSlice/userSlice";


const SideBar: FC = () => {
    const dispatch = useAppDispatch();
    const parsingIsActive = useAppSelector(state => state.parsingReducer.isActive);

    const logoutHandler = () => {
        UserService.logout().then(() => {
            dispatch(userActions.userLogoutSuccess());
        }).catch(() => {
            dispatch(userActions.userLogoutSuccess());
        })
    };

    return (
        <aside className={classes.sideBarContainer}>
            <nav className={classes.sideBarTop}>
                <ul className={classes.sideBarItemsList}>
                    <SideBarButton href={'/profile'} toolTipInscription='Profile' icon='account_circle' scroll={false}/>
                    <SideBarButton href={'/search'} toolTipInscription='Search' icon='search'/>
                    <SideBarButton href={'/databases'} toolTipInscription='Data bases' icon='storage'/>
                    <SideBarButton href={'/folders'} toolTipInscription='File browser' icon='folder_open'/>
                    {(parsingIsActive && window.innerWidth>767)&&<SideBarButton toolTipInscription={'Parsing'} icon={'preview'} href={'/parsing'}/>}
                </ul>
            </nav>
            <nav className={classes.sideBarBottom}>
                <ul className={classes.sideBarItemsList}>
                    <SideBarButton href={'/login'} toolTipInscription='Logout' icon='logout' onClick={() => logoutHandler()}/>
                </ul>
            </nav>
        </aside>
    );
};

export default SideBar;