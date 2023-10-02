'use client'
import React, {FC, useEffect} from 'react';
import {useRouter} from "next/navigation";
import {RouteNames} from "@/entites/routes/routes";

interface IRouter {
    toUrl: RouteNames
}
const Router:FC<IRouter> = ({toUrl}) => {
    const router = useRouter()
    useEffect(() => {
        router.push(toUrl)
    })
    return null
};

export default Router;