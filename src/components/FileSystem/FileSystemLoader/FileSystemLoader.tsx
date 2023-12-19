import React from 'react';
import classes from "./FileSystemLoader.module.scss";

const FileSystemLoader = () => {
    return (
        <div className={classes.loaderContainer}>
            <span className={classes.loader}/>
        </div>
    );
};

export default FileSystemLoader;