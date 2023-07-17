'use client'
import React, {FC} from 'react';
import {useAppSelector} from "@/store/hooks";
import Router from "@/components/Router/Router";
import {RouteNames} from "@/entites/routes/routes";
 
const CheckAuth: FC = () => {
    const {isAuth} = useAppSelector(state => state.userReducer)
    return (
        <>
            {!isAuth? <Router toUrl={RouteNames.LOGIN}/> : null}
        </>
    )
};

export default CheckAuth;