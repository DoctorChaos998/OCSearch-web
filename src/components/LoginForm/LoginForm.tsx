'use client'
import React, {FC, useState} from 'react';
import classes from "./LoginForm.module.scss";
import {useAppDispatch, useAppSelector} from "@/hooks";
import LoginButton from "@/ui/buttons/LoginButton/LoginButton";
import {notificationActions} from "@/store/slices/notificationSlice/notificationSlice";
import {login} from "@/store/slices/userSlice/userActions";
import LoginInput from "@/ui/inputs/LoginInput/LoginInput";
import LoginCheckBox from "@/ui/checkboxes/LoginCheckBox/LoginCheckBox";

const LoginForm: FC = () => {
    const [nickname, setNickname] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [nicknameError, setNicknameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const error = useAppSelector(state => state.userReducer.errorText);
    const dispatch = useAppDispatch();

    const onSubmitFormHandler = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        if(!nickname) {
            dispatch(notificationActions.createNotificationWithTimer({notificationMessage: 'Field nickname is not define', notificationType: 'warning'}));
            setNicknameError(true);
            return;
        }
        setNicknameError(false);
        if(!password) {
            dispatch(notificationActions.createNotificationWithTimer({notificationMessage: 'Field password is not define', notificationType: 'warning'}));
            setPasswordError(true);
            return;
        }
        setPasswordError(false);
        dispatch(login(nickname, password, rememberMe)).then(() => {
            if(error){
                setPassword('');
                setPasswordError(true);
            }
        });
    }

    return (
        <div className={classes.loginFormContainer}>
            <div className={classes.loginFormContentContainer}>
                <form className={classes.loginForm} onSubmit={onSubmitFormHandler}>
                    <h2 className={classes.loginFormHeader}>LogIn</h2>
                    <LoginInput value={nickname} onChange={(event) => setNickname(event.target.value)} type={'text'} icon={'perm_identity'} isError={nicknameError} placeholder={'Nickname'}/>
                    <LoginInput value={password} onChange={(event) => setPassword(event.target.value)} type={'password'} icon={'lock_outline'} isError={passwordError} placeholder={'Password'}/>
                    <LoginButton>Log in</LoginButton>
                    <LoginCheckBox onChange={(event) => setRememberMe(event.target.checked)} checked={rememberMe}>Remember me</LoginCheckBox>
                </form>
            </div>
        </div>
    );
};
export default LoginForm;