import React from 'react';
import classes from "@/components/User/Sessions/Sessions.module.scss";
import SessionsSkeletonLoading from "@/ui/loaders/SessionsSkeletonLoading/SessionsSkeletonLoading";

const SessionsLoader = () => {
    return (
        <>
            <h2 className={classes.sessionsTextHeader}>Current session</h2>
            <SessionsSkeletonLoading></SessionsSkeletonLoading>
            <h2 className={classes.sessionsTextHeader}>Active sessions</h2>
            <SessionsSkeletonLoading></SessionsSkeletonLoading>
            <SessionsSkeletonLoading></SessionsSkeletonLoading>
            <SessionsSkeletonLoading></SessionsSkeletonLoading>
            <h2 className={classes.sessionsTextHeader}>Inactive sessions</h2>
            <SessionsSkeletonLoading></SessionsSkeletonLoading>
            <SessionsSkeletonLoading></SessionsSkeletonLoading>
            <SessionsSkeletonLoading></SessionsSkeletonLoading>
        </>
    );
};

export default SessionsLoader;