import React from 'react';
import UserCard from "@/components/User/UserCard/UserCard";
import Sessions from "@/components/User/Sessions/Sessions";
import ChangePasswordModal from "@/components/User/ChangePasswordModal/ChangePasswordModal";
import SessionInfoModal from "@/components/User/SessionInfoModal/SessionInfoModal";
import ChangePasswordButton from "@/components/User/ChangePasswordButton/ChangePasswordButton";

const Page = () => {
    return (
        <>
            <UserCard/>
            <Sessions/>
            <SessionInfoModal/>
        </>
    );
};

export default Page;