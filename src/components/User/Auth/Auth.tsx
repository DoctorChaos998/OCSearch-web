'use client'
import React, {FC, PropsWithChildren, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@/hooks";
import {checkAuth} from "@/store/slices/userSlice/userActions";
import LoaderForCheckAuth from "@/ui/loaders/LoaderForCheckAuth/LoaderForCheckAuth";

const Auth: FC<PropsWithChildren> = ({children}) => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.userReducer.status);
    useEffect(() => {
        dispatch(checkAuth())
    }, [])
    return (
        status === 'initial' || status === 'loading'?
            <LoaderForCheckAuth/>
            :
            children
    )
};

export default Auth;