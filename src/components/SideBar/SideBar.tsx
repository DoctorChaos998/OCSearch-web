'use client'
import React, {FC} from 'react';
import classes from "./SideBar.module.scss";
import {useAppDispatch, useAppSelector} from "@/hooks";
import SideBarButton from "@/ui/buttons/SideBarButton/SideBarButton";
import {logout} from "@/store/slices/userSlice/userActions";
import {uploadingProcessActions} from "@/store/slices/uploadingProcessSlice/uploadingProcessSlice";


const SideBar: FC = () => {
    const dispatch = useAppDispatch();
    const parsingIsActive = useAppSelector(state => state.parsingReducer.isActive);
    return (
        <aside className={classes.sideBarContainer}>
            <nav className={classes.sideBarTop}>
                <ul className={classes.sideBarItemsList}>
                    <SideBarButton href={'/profile'} toolTipInscription='Profile' icon='account_circle'/>
                    <SideBarButton href={'/search'} toolTipInscription='Search' icon='search'/>
                    <SideBarButton href={'/databases'} toolTipInscription='Data bases' icon='storage'/>
                    <SideBarButton href={'/folders'} toolTipInscription='File browser' icon='folder_open'/>
                    {(parsingIsActive && window.innerWidth>767)&&<SideBarButton toolTipInscription={'Parsing'} icon={'preview'} href={'/parsing'}/>}
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