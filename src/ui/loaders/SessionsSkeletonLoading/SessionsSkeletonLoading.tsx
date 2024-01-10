import React from 'react';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import classes from "./SessionsSkeletonLoading.module.scss";
const SessionsSkeletonLoading = () => {
    return (
        <div className={classes.loader}>
            <Skeleton baseColor="#202020" highlightColor="#833ab4" width={'100%'} height={'100%'} borderRadius={40}></Skeleton>
        </div>
    );
};

export default SessionsSkeletonLoading;