import React, {FC, InputHTMLAttributes, useState} from 'react';
import classes from "./ChangePasswordInput.module.scss";
interface IChangePasswordInput extends InputHTMLAttributes<HTMLInputElement>{
    passwordInputError: string,
}

const ChangePasswordInput: FC<IChangePasswordInput> = (({passwordInputError, ...props}) => {
    const [inputTextIsVisible, setInputTextIsVisible] = useState(false);
    return (
        <div className={`${classes.changePasswordInputContainer} ${passwordInputError?classes.changePasswordInputContainerError:''}`}>
            <input className={classes.changePasswordInput} type={inputTextIsVisible?'text':'password'} {...props}/>
            <span className={`material-icons ${classes.changePasswordInputIcon}`} onClick={() => setInputTextIsVisible(!inputTextIsVisible)}>
                {inputTextIsVisible?'visibility':'visibility_off'}
            </span>
            {passwordInputError&&<span className={classes.changePasswordInputTooltip}>
                {passwordInputError}
            </span>}
        </div>
    );
});

export default ChangePasswordInput;