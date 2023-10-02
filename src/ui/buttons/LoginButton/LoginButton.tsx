import React, {FC} from 'react';
import classes from "./LoginButton.module.css";

interface ILoginButtonProps {
    onClickLoginButtonHandler: (e: React.MouseEvent<HTMLButtonElement>) => void,
}
const LoginButton: FC<ILoginButtonProps> = ({onClickLoginButtonHandler}) => {
    return (
        <button type={'submit'} onClick={onClickLoginButtonHandler} className={classes.loginButton}>
            Войти
        </button>
    );
};

export default LoginButton;