'use client'
import React, {useEffect} from 'react';
import classes from "./LoginPage.module.scss";
import {useRouter} from "next/navigation";
import {useAppSelector} from "@/hooks";
import LoaderForCheckAuth from "@/ui/loaders/LoaderForCheckAuth/LoaderForCheckAuth";
import LoginForm from "@/components/LoginForm/LoginForm";
const LoginPage = () => {
    const router = useRouter();
    const isAuth = useAppSelector(state => state.userReducer.isAuth);
    useEffect(() => {
        if(isAuth) router.push('/profile');
    }, [isAuth]);
    return (
        <main>
            {!isAuth?
            <div className={classes.container}>
                <LoginForm/>
            </div>
            :
            <LoaderForCheckAuth/>}
        </main>
    );
};

export default LoginPage;