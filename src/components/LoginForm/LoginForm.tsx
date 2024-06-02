'use client'
import React, {useState} from 'react';
import classes from "./LoginForm.module.scss";
import LoginButton from "@/ui/buttons/LoginButton/LoginButton";
import {notificationActions} from "@/lib/features/notificationSlice/notificationSlice";
import LoginInput from "@/ui/inputs/LoginInput/LoginInput";
import LoginCheckBox from "@/ui/checkboxes/LoginCheckBox/LoginCheckBox";
import UserService from "@/http/userService";
import {IApiError} from "@/types/api";
import {userActions} from "@/lib/features/userSlice/userSlice";
import {useAppDispatch} from "@/lib/hooks";

const LoginForm = () => {
    const [nickname, setNickname] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [nicknameError, setNicknameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
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
        UserService.login(nickname, password, rememberMe).then(value => {
            dispatch(userActions.userLoginSuccess(value));
            UserService.createRequestInterceptor();
            UserService.createResponseInterceptor(() => {
                dispatch(userActions.userLogoutSuccess());
            });
        }).catch((reason: IApiError) => {
            dispatch(notificationActions.createNotificationWithTimer({notificationMessage: reason.error, notificationType:'warning'}));
            setPassword('');
        })
    }

    return (
        <div className={classes.loginFormContainer}>
            <form className={classes.loginFormContentContainer} onSubmit={onSubmitFormHandler}>
                <h2 className={classes.loginFormHeader}>LogIn</h2>
                <LoginInput value={nickname} onChange={(event) => setNickname(event.target.value)} type={'text'} icon={'perm_identity'} isError={nicknameError} placeholder={'Nickname'}/>
                <LoginInput value={password} onChange={(event) => setPassword(event.target.value)} type={'password'} icon={'lock_outline'} isError={passwordError} placeholder={'Password'}/>
                <LoginButton>Log in</LoginButton>
                <LoginCheckBox onChange={(event) => setRememberMe(event.target.checked)} checked={rememberMe}>Remember me</LoginCheckBox>
            </form>
        </div>
    );
};
export default LoginForm;