import React, {FC} from 'react';
import classes from "./LoaderForCheckAuth.module.scss";

const LoaderForCheckAuth: FC = () => {
    return (
        <div className={classes.checkAuthLoaderContainer}>
            <div className={classes.checkAuthLoader}></div>
        </div>
    );
};

export default LoaderForCheckAuth;