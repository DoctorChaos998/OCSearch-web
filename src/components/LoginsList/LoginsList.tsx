import React, {FC, useEffect, useState} from 'react';
import LoginsService from './Api/Api'
import {IUserLoginInfoResponse} from "./Api/Responce";
import CardWithLoginInfo from "@/ui/cards/CardWithLoginInfo/CardWithLoginInfo";

const LoginsList: FC = () => {
    const [userLogins, setUserLogins] = useState<IUserLoginInfoResponse[]>([])
    const fetchUserLogins = async () => {
        try {
            const response = await LoginsService.getLogins()
            setUserLogins(response.data)
        } catch (e: any) {
            console.log(e)
        }
    }
    useEffect(() => {
        const userLoginsHandler = fetchUserLogins().then()
        return () => {userLoginsHandler.catch()}
    }, [])

    return (
        <div>
            <p style={{marginLeft: 100, marginTop: 100, fontSize: "2em", color: "white"}}>Последние входы:</p>
            <ul>
                {userLogins.map((value, i) =>
                    <li key={i} style={{listStyle: "none"}}>
                        <CardWithLoginInfo loginTime={value.loginTime} userAgent={value.userAgent}></CardWithLoginInfo>
                    </li>
                )}
            </ul>
        </div>
    );
};

export {LoginsList};