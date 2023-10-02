'use client'
import React, {FC} from 'react';
import classes from "./profile.module.css";
import {useAppSelector} from "@/store/hooks";
import UserCard from "@/ui/cards/UserCard/UserCard";
import {LoginsList} from "@/components/LoginsList";



const Profile: FC = () => {
    const {user} = useAppSelector(state => state.userReducer)
    //console.log(user,isAuth,loginError,isLoading,accessToken)
    return (
        <div className={classes.contentOnProfilePage}>
            <UserCard userCardNickname={user.nickname}></UserCard>
            <LoginsList></LoginsList>
        </div>
    );
};

export default Profile;