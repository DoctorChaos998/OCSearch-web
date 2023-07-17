import React, {FC, PropsWithChildren} from 'react';
import classes from "./CardWithLoginInfo.module.css";

interface CardWithLoginInfoProps {
    loginTime: string
    userAgent: string
}

const CardWithLoginInfo: FC<PropsWithChildren<CardWithLoginInfoProps>> = ({children, loginTime, userAgent}) => {
    return (
        <div className={classes.loginInfoWrapper}>
            <span className='material-icons'>
                schedule
            </span>
            {loginTime}
            <span className='material-icons'>
                info
            </span>
            {userAgent}
        </div>
    );
};

export default CardWithLoginInfo;