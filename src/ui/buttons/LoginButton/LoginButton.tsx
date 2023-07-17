import React, {FC, PropsWithChildren} from 'react';
import classes from "./LoginButton.module.css";

interface LoginButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
}
const LoginButton: FC<PropsWithChildren<LoginButtonProps>> = ({children, onClick}) => {
    return (
        <button type={'submit'} onClick={onClick} className={classes.loginButton}>
            {children}
        </button>
    );
};

export default LoginButton;