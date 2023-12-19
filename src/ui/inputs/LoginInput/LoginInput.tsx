import React, {FC, InputHTMLAttributes} from 'react';
import classes from "./LoginInput.module.scss";
interface ILoginInputProps extends InputHTMLAttributes<HTMLInputElement>{
    icon: string,
    isError: boolean,
}
const LoginInput: FC<ILoginInputProps> = ({icon, isError, ...props}) => {
    return (
        <div className={`${classes.loginInputContainer} ${isError?classes.loginInputContainerError:''}`}>
            <span className={`${classes.loginInputIcon} material-icons`}>
                    {icon}
            </span>
            <input className={classes.loginInput} {...props}/>
        </div>
    );
};

export default LoginInput;