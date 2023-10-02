import React, {FC, PropsWithChildren} from 'react';
import classes from "./LoginInput.module.css";
interface ILoginInputProps {
    loginInputPlaceholder: string,
    onChangeLoginInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    loginInputValue: string,
    loginInputType: string,
    loginInputIcon: string
}
const LoginInput: FC<ILoginInputProps> = ({onChangeLoginInputHandler, loginInputPlaceholder, loginInputValue, loginInputType, loginInputIcon}) => {
    return (
        <div className={classes.loginInputContainer}>
            <span className={`${classes.loginInputIcon} material-icons`}>
                    {loginInputIcon}
            </span>
            <input onChange={onChangeLoginInputHandler} placeholder={loginInputPlaceholder} value={loginInputValue} type={loginInputType} className={classes.loginInput}>
            </input>
        </div>
    );
};

export default LoginInput;