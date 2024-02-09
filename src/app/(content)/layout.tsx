import React from "react";
import classes from "./layout.module.scss";
import {Metadata} from "next";
import CheckAuth from "@/components/User/CheckAuth/CheckAuth";
import Header from "@/components/Header/Header";
import SideBar from "@/components/SideBar/SideBar";

export const metadata: Metadata = {
    title: 'OCSearch',
    description: 'Power',
}
export default function ContentLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <CheckAuth>
            <Header/>
            <main>
                <div className={classes.flexContainerWithContent}>
                    <SideBar></SideBar>
                    <div className={classes.mainContainer}>
                        {children}
                    </div>
                </div>
            </main>
        </CheckAuth>
    )
}