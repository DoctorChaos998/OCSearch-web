import React, {FC} from 'react';
import classes from "./LoginCheckBox.module.css";

interface ILoginCheckBoxProps {
    onChangeLoginCheckBoxHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    loginCheckBoxChecked: boolean,
    loginCheckBoxInscription: string
}
const LoginCheckBox:FC<ILoginCheckBoxProps> = ({onChangeLoginCheckBoxHandler, loginCheckBoxInscription, loginCheckBoxChecked}) => {
    return (
        <div className={classes.loginCheckBoxContainer}>
            <input type="checkbox" checked={loginCheckBoxChecked} onChange={onChangeLoginCheckBoxHandler}/>
            <span>{loginCheckBoxInscription}</span>
        </div>
    );
};

export default LoginCheckBox;