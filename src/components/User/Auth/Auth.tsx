'use client'
import React, {useEffect} from 'react';
import LoaderForCheckAuth from "@/ui/loaders/LoaderForCheckAuth/LoaderForCheckAuth";
import {checkAuth} from "@/lib/features/userSlice/userActions";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";

const Auth = ({children}: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.userReducer.status);

    useEffect(() => {
        dispatch(checkAuth());
    }, []);

    return (
        status === 'initial' || status === 'loading'?
            <LoaderForCheckAuth/>
            :
            children
    )
};

export default Auth;