import React from 'react';
import UserCard from "@/components/User/UserCard/UserCard";
import Sessions from "@/components/User/Sessions/Sessions";
import ChangePasswordModal from "@/components/User/ChangePasswordModal/ChangePasswordModal";
import SessionInfoModal from "@/components/User/SessionInfoModal/SessionInfoModal";

const Page = () => {
    return (
        <>
            <UserCard/>
            <Sessions/>
            <ChangePasswordModal/>
            <SessionInfoModal/>
        </>
    );
};

export default Page;