import React, {FC, PropsWithChildren} from 'react';
import classes from "./LoginButton.module.scss";

const LoginButton: FC<PropsWithChildren> = ({children}) => {
    return (
        <button type={'submit'} className={classes.loginButton}>
            {children}
        </button>
    );
};

export default LoginButton;