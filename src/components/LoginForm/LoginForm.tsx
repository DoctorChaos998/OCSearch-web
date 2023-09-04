'use client'
import React, {FC, useEffect, useState} from 'react';
import classes from "./LoginForm.module.css";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import LoginInput from "@/ui/inputs/LoginInput/LoginInput";
import LoginButton from "@/ui/buttons/LoginButton/LoginButton";
import LoginCheckBox from "@/ui/checkboxs/LoginCheckBox/LoginCheckBox";
import {login} from "@/store/user/ActionCreators";



const LoginForm: FC = () => {
    const [nickname, setNickname] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useAppDispatch()
    const [errorAlert, setErrorAlert] = useState<string>('')
    const {loginError} = useAppSelector(state => state.userReducer)
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const loginButtonHandler = (event: React.MouseEvent<HTMLButtonElement>) =>{
        event.preventDefault()
        if(!nickname) {
            setErrorAlert('Поле nickname не задано')
            return
        }
        if(!password) {
            setErrorAlert('Поле password не задано')
            return;
        }
        dispatch(login(nickname, password, rememberMe))
    }

    useEffect(() =>{
        setErrorAlert(loginError)
    },[loginError])

    return (
        <div className={classes.blo}>
            <div className={classes.alert} style={{opacity: errorAlert ? "1" : "0"}}>
                <label className="label" id="label">{errorAlert}</label>
            </div>
            <div className={classes.wrapper}>
                <div className={classes.loginFormBox}>
                    <h2 className={classes.headerLoginForm}>LogIn</h2>
                    <form style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                        <LoginInput placeholder={'Nickname'} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)} value={nickname} type={'text'} icon={'perm_identity'}></LoginInput>
                        <LoginInput placeholder={'Пароль'} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} value={password} type={'password'} icon={'lock_outline'}></LoginInput>
                        <LoginButton onClick={loginButtonHandler}>Войти</LoginButton>
                        <LoginCheckBox onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)} checked={rememberMe} type={'checkbox'} content={'Запомнить меня'}></LoginCheckBox>
                    </form>
                </div>
            </div>
        </div>
    );
};
//, display: errorAlert ? "inline-block" : "none"}}>
export default LoginForm;