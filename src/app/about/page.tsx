'use client'
import React, {FC} from 'react';
import {useAppSelector} from "@/store/hooks";
import Router from "@/components/Router/Router";

const Page: FC = () => {
    const {isAuth} = useAppSelector(state => state.userReducer)
    return (
        <div>
            {!isAuth && <Router toUrl={'/new'}/>}
            about
        </div>
    );
};

export default Page;