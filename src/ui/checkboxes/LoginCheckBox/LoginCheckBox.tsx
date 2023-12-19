import React, {FC, InputHTMLAttributes, PropsWithChildren} from 'react';
import classes from "./LoginCheckBox.module.scss";

const LoginCheckBox:FC<PropsWithChildren<InputHTMLAttributes<HTMLInputElement>>> = ({children, ...props}) => {
    return (
        <div className={classes.loginCheckBoxContainer}>
            <label className={classes.loginCheckBoxText}>
                <input type="checkbox" {...props} className={classes.loginCheckBox}/>
                {children}
            </label>
        </div>
    );
};

export default LoginCheckBox;