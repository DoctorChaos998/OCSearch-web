import React from "react";
import CheckAuth from "@/components/CheckAuth/CheckAuth";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import classes from "./layout.module.css";
import SideBar from "@/components/SideBar/SideBar";
import {Metadata} from "next";


export const metadata: Metadata = {
    title: 'OCSearch',
    description: 'Power',
}
export default function ContentLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <>
            <CheckAuth>
                <Header></Header>
                <main>
                    <div className={classes.flexContainerWithContent}>
                        <SideBar></SideBar>
                        <div className={classes.mainContainer}>
                            {children}
                        </div>
                    </div>
                </main>
                {/*<Footer></Footer>*/}
            </CheckAuth>
        </>
    )
}