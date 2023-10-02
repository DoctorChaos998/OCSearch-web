'use client'
import React, {FC, PropsWithChildren, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import Router from "@/components/AuthModule/Router/Router";
import {RouteNames} from "@/entites/routes/routes";
import {setResponseInterceptor} from "@/components/AuthModule/UserStore/ActionCreators";
 
const CheckAuth: FC<PropsWithChildren> = ({children}) => {
    const {isAuth} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    useEffect(()=> {
        if (isAuth){
            dispatch(setResponseInterceptor())
        }
    },[])
    return (
        <>
            {!isAuth? <Router toUrl={RouteNames.LOGIN}/> : children}
        </>
    )
};

export default CheckAuth;