'use client'
import React, {FC, PropsWithChildren, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@/hooks";
import LoaderForCheckAuth from "@/ui/loaders/LoaderForCheckAuth/LoaderForCheckAuth";
import {useRouter} from "next/navigation";
import {checkAuth, setResponseInterceptor} from "@/store/slices/userSlice/userActions";

const CheckAuth: FC<PropsWithChildren> = ({children}) => {
    const router = useRouter();
    const isAuth = useAppSelector(state => state.userReducer.isAuth);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(isAuth) dispatch(setResponseInterceptor());
        else router.push('/login');
    }, []);
    return (
        !isAuth?
            <LoaderForCheckAuth/>:
            children
    );
};

export default CheckAuth;