'use client'
import React, {FC, PropsWithChildren, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {checkAuth, setLoadingFalse} from "@/components/Auth/store/reducers/ActionCreators";

const Auth: FC<PropsWithChildren> = ({children}) => {
    const dispatch = useAppDispatch()
    const {isLoading} = useAppSelector(state => state.userReducer)
    //useHook(router)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        } else dispatch(setLoadingFalse())
    }, [])
    return (
        <>
            {isLoading?
                <div>Loading</div>
            :
                children
            }
        </>
    )
};

export default Auth;
