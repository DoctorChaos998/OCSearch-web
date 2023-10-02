'use client'
import {FC} from 'react';
import LoginForm from "../../components/LoginForm/LoginForm";
import classes from "./LoginPage.module.css";
import {useAppSelector} from "@/store/hooks";
import Router from "@/components/AuthModule/Router/Router";
import {RouteNames} from "@/entites/routes/routes";

const Login: FC = () => {
    const {isAuth} = useAppSelector(state => state.userReducer)
    return (
        <>
            {isAuth?
                <Router toUrl={RouteNames.PROFILE}/>
                :
                <div className={classes.loginPage}>
                    <LoginForm></LoginForm>
                </div>
            }
        </>

    );
};

export default Login;