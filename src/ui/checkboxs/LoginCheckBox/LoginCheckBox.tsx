import React, {FC} from 'react';
import classes from "./LoginCheckBox.module.css";

interface LoginCheckBoxProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    checked: boolean,
    type: string,
    content: string
}
const LoginCheckBox:FC<LoginCheckBoxProps> = ({onChange, checked, type, content}) => {
    return (
        <div className={classes.checkBoxWrapper}>
            <input type={type} checked={checked} onChange={onChange}/>
            <span>{content}</span>
        </div>
    );
};

export default LoginCheckBox;