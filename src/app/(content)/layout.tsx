'use client'
import React, {useEffect} from "react";
import classes from "./layout.module.scss";
import Header from "@/components/Header/Header";
import SideBar from "@/components/SideBar/SideBar";
import {useAppSelector} from "@/lib/hooks";
import LoaderForCheckAuth from "@/ui/loaders/LoaderForCheckAuth/LoaderForCheckAuth";
import {useRouter} from "next/navigation";
import UploadingProcess from "@/components/UploadingProcess/UploadingProcess";
import UsagePolicy from "@/components/UsagePolicy/UsagePolicy";

export default function ContentLayout({children,}: {
    children: React.ReactNode
}) {
    const isAuth = useAppSelector(state => state.userReducer.isAuth);
    const router = useRouter();

    useEffect(() => {
        if(!isAuth) router.push('/login');
    }, []);

    return (
        isAuth?
            <>
                <Header/>
                <main>
                    <div className={classes.flexContainerWithContent}>
                        <SideBar></SideBar>
                        <div className={classes.mainContainer}>
                            {children}
                        </div>
                    </div>
                </main>
                <UploadingProcess/>
                <UsagePolicy/>
            </>:
            <LoaderForCheckAuth/>
    )
}