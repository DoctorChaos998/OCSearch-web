import React, {FC, PropsWithChildren} from 'react';
import classes from "./LoginInput.module.css";
interface LoginInputProps {
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
    type: string,
    icon: string
}
const LoginInput: FC<PropsWithChildren<LoginInputProps>> = ({children, onChange, value, placeholder, type, icon}) => {
    return (
        <div className={classes.inputBox}>
            <span className={`${classes.icon} material-icons`}>
                    {icon}
            </span>
            <input onChange={onChange} placeholder={placeholder} value={value} type={type} className={classes.customInput}>
                {children}
            </input>
        </div>
    );
};

export default LoginInput;