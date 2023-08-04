'use client'
import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import Router from "@/components/Router/Router";
import {RouteNames} from "@/entites/routes/routes";
import {setAccess} from "@/store/user/ActionCreators";
 
const CheckAuth: FC = () => {
    const {isAuth} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    useEffect(()=> {
        if (isAuth){
            dispatch(setAccess())
        }
    },[])
    return (
        <>
            {!isAuth? <Router toUrl={RouteNames.LOGIN}/> : null}
        </>
    )
};

export default CheckAuth;