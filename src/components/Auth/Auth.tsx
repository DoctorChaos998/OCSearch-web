'use client'
import React, {FC, PropsWithChildren, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {checkAuth} from "@/store/user/ActionCreators";
import LoaderForCheckAuth from "@/ui/loaders/LoaderForCheckAuth/LoaderForCheckAuth";

const Auth: FC<PropsWithChildren> = ({children}) => {
    const dispatch = useAppDispatch()
    const {isLoading} = useAppSelector(state => state.userReducer)
    useEffect(() => {
        dispatch(checkAuth())
    }, [])
    return (
        <>
            {isLoading?
                <LoaderForCheckAuth/>
            :
                children
            }
        </>
    )
};

export default Auth;
