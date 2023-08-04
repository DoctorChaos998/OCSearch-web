import React, {FC} from 'react';
import classes from "./LoaderForCheckAuth.module.css";

const LoaderForCheckAuth: FC = () => {
    return (
        <div className={classes.container}>
            <div className={classes.loader}></div>
        </div>
    );
};

export default LoaderForCheckAuth;