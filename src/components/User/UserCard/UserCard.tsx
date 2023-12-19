'use client'
import React from 'react';
import classes from "./UserCard.module.scss";
import {useAppSelector} from "@/hooks";

const UserCard = () => {
    const userName = useAppSelector(state => state.userReducer.nickname);
    return (
        <div className={classes.userCardContainer}>
            <h1 className={classes.userCardNickname}>Welcome, {userName}</h1>
            <span className={`material-icons ${classes.userCardVerifiedIcon}`}>
                verified
            </span>
        </div>
    );
};

export default UserCard;