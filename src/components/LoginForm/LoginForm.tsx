'use client'
import React, {FC, useEffect, useState} from 'react';
import classes from "./LoginForm.module.css";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import LoginInput from "@/ui/inputs/LoginInput/LoginInput";
import LoginButton from "@/ui/buttons/LoginButton/LoginButton";
import LoginCheckBox from "@/ui/checkboxs/LoginCheckBox/LoginCheckBox";
import {login} from "@/components/AuthModule/UserStore/ActionCreators";
import {notificationSlice} from "@/components/Notification/store/NotificationSlice";

const LoginForm: FC = () => {
    const [nickname, setNickname] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useAppDispatch()
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const loginButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) =>{
        event.preventDefault()
        if(!nickname) {
            dispatch(notificationSlice.actions.createNotificationWithTimer('Field nickname is not define'));
            return;
        }
        if(!password) {
            dispatch(notificationSlice.actions.createNotificationWithTimer('Field password is not define'));
            return;
        }
        dispatch(login(nickname, password, rememberMe)).then();
    }

    return (
        <div className={classes.loginFormContainer}>
            <div className={classes.loginFormWrapper}>
                <div className={classes.loginFormBox}>
                    <h2 className={classes.loginFormHeader}>LogIn</h2>
                    <form className={classes.loginForm}>
                        <LoginInput loginInputPlaceholder={'Nickname'} onChangeLoginInputHandler={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)} loginInputValue={nickname} loginInputType={'text'} loginInputIcon={'perm_identity'}></LoginInput>
                        <LoginInput loginInputPlaceholder={'Пароль'} onChangeLoginInputHandler={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} loginInputValue={password} loginInputType={'password'} loginInputIcon={'lock_outline'}></LoginInput>
                        <LoginButton onClickLoginButtonHandler={loginButtonClickHandler}></LoginButton>
                        <LoginCheckBox onChangeLoginCheckBoxHandler={(e: React.ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)} loginCheckBoxChecked={rememberMe} loginCheckBoxInscription={'Запомнить меня'}></LoginCheckBox>
                    </form>
                </div>
            </div>
        </div>
    );
};
//, display: errorAlert ? "inline-block" : "none"}}>
export default LoginForm;