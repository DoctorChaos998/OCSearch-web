import React, {FC} from 'react';
import classes from "./LoaderForCheckAuth.module.css";

const LoaderForCheckAuth: FC = () => {
    return (
        <div className={classes.loaderForCheckAuthContainer}>
            <div className={classes.loaderForCheckAuth}></div>
        </div>
    );
};

export default LoaderForCheckAuth;